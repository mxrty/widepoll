import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Editor, Transforms, Text, createEditor, Range } from "slate";
import { css, cx } from "@emotion/css";
import { withHistory } from "slate-history";
import _ from "lodash";

const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  )
);

const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
));

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

const SentimentEditor = ({ textValue, onSentimentChange }) => {
  const INITIAL_VALUE = [
    {
      children: [
        {
          text: textValue,
        },
      ],
    },
  ];

  const [value, setValue] = useState(INITIAL_VALUE);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        onSentimentChange(!_.isEqual(value, INITIAL_VALUE));
      }}
    >
      <HoveringToolbar />
      <Editable
        renderLeaf={(props) => <Leaf {...props} />}
        onDOMBeforeInput={(event) => {
          event.preventDefault();
        }}
      />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Slate>
  );
};

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.highlightAgree) {
    children = <mark style={{ backgroundColor: "#69B34C" }}>{children}</mark>;
  }
  if (leaf.highlightDisagree) {
    children = <mark style={{ backgroundColor: "#BA4D36" }}>{children}</mark>;
  }
  if (leaf.highlightBias) {
    children = <mark style={{ backgroundColor: "#FF8E15" }}>{children}</mark>;
  }

  return <span {...attributes}>{children}</span>;
};

const HoveringToolbar = () => {
  const ref = useRef();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = 1;
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        <FormatButton format="highlightAgree" label="Agree" />
        <FormatButton format="highlightDisagree" label="Disagree" />
        <FormatButton format="highlightBias" label="Bias" />
      </Menu>
    </Portal>
  );
};

const FormatButton = ({ format, label }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      {label}
    </Button>
  );
};

export default SentimentEditor;
