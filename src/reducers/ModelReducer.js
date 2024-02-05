import {
  ALL_MODEL_FAIL,
  ALL_MODEL_REQUEST,
  ALL_MODEL_SUCCESS,
  ADMIN_MODEL_REQUEST,
  ADMIN_MODEL_SUCCESS,
  ADMIN_MODEL_FAIL,
  NEW_MODEL_REQUEST,
  NEW_MODEL_SUCCESS,
  NEW_MODEL_FAIL,
  NEW_MODEL_RESET,
  MODEL_DETAILS_REQUEST,
  MODEL_DETAILS_FAIL,
  MODEL_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  FEATURED_MODEL_REQUEST,
  FEATURED_MODEL_SUCCESS,
  FEATURED_MODEL_FAIL,
} from "../constants/ModelConstant";

export const modelsReducer = (state = { models: [] }, action) => {
  switch (action.type) {
    case ALL_MODEL_REQUEST:
      return {
        loading: true,
        models: [],
      };
    case FEATURED_MODEL_REQUEST:
      return {
        loading: true,
        featuredModels: [],
      };
    case ADMIN_MODEL_REQUEST:
      return {
        loading: true,
        models: [],
      };
    case FEATURED_MODEL_SUCCESS:
      return {
        loading: false,
        featuredModels: action.payload,
      };
    case ALL_MODEL_SUCCESS:
      return {
        loading: false,
        models: action.payload,
        // productsCount: action.payload.productsCount,
        // resultPerPage: action.payload.resultPerPage,
        // filteredProductsCount: action.payload.filteredProductsCount,
      };

    case ADMIN_MODEL_SUCCESS:
      return {
        loading: false,
        models: action.payload,
      };
    case FEATURED_MODEL_FAIL:
    case ALL_MODEL_FAIL:
    case ADMIN_MODEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newModelReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_MODEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_MODEL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_MODEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_MODEL_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const modelDetailsReducer = (state = { model: {} }, action) => {
  switch (action.type) {
    case MODEL_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case MODEL_DETAILS_SUCCESS:
      return {
        loading: false,
        model: action.payload,
      };
    case MODEL_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
