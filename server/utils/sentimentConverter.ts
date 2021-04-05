interface slateValues {
  children: Array<sentimentObj>;
}

interface sentimentObj {
  text: string;
  highlightAgree?: boolean;
  highlightDisagree?: boolean;
  highlightBias?: boolean;
}

export const serializeSentiment = (sentiment: slateValues[]): string => {
  let isSentiment = false;
  let formattedString = "";
  const sentiments = sentiment[0].children;

  // TODO: check for existing tags in text
  sentiments.forEach((sentiment) => {
    let format = "plain";
    if (sentiment.highlightAgree) {
      format = "agree";
    } else if (sentiment.highlightDisagree) {
      format = "disagree";
    } else if (sentiment.highlightBias) {
      format = "bias";
    }
    if (format !== "plain") {
      isSentiment = true;
      formattedString += `<${format}>${sentiment.text}</${format}>`;
    } else {
      formattedString += sentiment.text;
    }
  });

  if (isSentiment) {
    return formattedString;
  } else return "";
};

export const deserializeSentiment = (sentiment: string): slateValues[] => {
  let sentiments = { children: [] };

  let slateFormat = [];
  slateFormat.push(sentiments);
  return slateFormat;
};

export const isSentiment = (sentiment: slateValues[]): boolean => {
  let isSentiment = false;
  const sentiments = sentiment[0].children;

  sentiments.forEach((sentiment) => {
    if (
      sentiment.highlightAgree ||
      sentiment.highlightDisagree ||
      sentiment.highlightBias
    ) {
      isSentiment = true;
      return isSentiment;
    }
  });

  return isSentiment;
};
