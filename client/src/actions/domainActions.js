import api from "../apis/api";
import history from "../history";
import {
  CREATE_DOMAIN,
  FETCH_DOMAIN,
  EDIT_DOMAIN,
  DELETE_DOMAIN,
  FETCH_DOMAINS,
} from "./types";

export const createDomain = (formValues) => async (dispatch, getState) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.post(
    "/domains",
    {
      ...formValues,
      user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: CREATE_DOMAIN, payload: response.data });
  history.push(`/d/${response.data.domain_name}`);
};

export const fetchDomain = (domain) => async (dispatch) => {
  const response = await api.get(`/domains/${domain}`);
  dispatch({ type: FETCH_DOMAIN, payload: response.data });
};

export const fetchDomains = () => async (dispatch) => {
  const response = await api.get(`/domains`);
  dispatch({ type: FETCH_DOMAINS, payload: response.data });
};

export const editDomain = (domain, formValues) => async (
  dispatch,
  getState
) => {
  const { jwt_token, user_id } = getState().auth;
  const response = await api.put(
    `/domains/${domain}`,
    {
      ...formValues,
      user_id,
    },
    {
      headers: {
        jwt_token: jwt_token,
      },
    }
  );
  dispatch({ type: EDIT_DOMAIN, payload: response.data });
};

export const deleteDomain = (domain) => async (dispatch) => {
  await api.delete(`/domains/${domain}`);
  dispatch({ type: DELETE_DOMAIN, payload: domain });
};
