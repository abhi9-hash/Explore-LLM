import axios from "axios";
import {
  FEATURED_MODEL_FAIL,
  FEATURED_MODEL_REQUEST,
  FEATURED_MODEL_SUCCESS,
  ALL_MODEL_FAIL,
  ALL_MODEL_REQUEST,
  ALL_MODEL_SUCCESS,
  NEW_MODEL_REQUEST,
  NEW_MODEL_SUCCESS,
  NEW_MODEL_FAIL,
  MODEL_DETAILS_REQUEST,
  MODEL_DETAILS_FAIL,
  MODEL_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  FILTERED_MODEL_REQUEST,
  FILTERED_MODEL_SUCCESS,
  FILTERED_MODEL_FAIL,
} from "../constants/ModelConstant";

// get all models
const baseURL = process.env.REACT_APP_BASE_URL+'/models'
export const getModel = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_MODEL_REQUEST,
    });
    // https://my-json-server.typicode.com/abhi9-hash/mock-data/models`;
    // let link = `${baseURL}/models`;
    // ?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

    const { data } = await axios.get(baseURL);
    console.log({ data });
    dispatch({
      type: ALL_MODEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MODEL_FAIL,
      payload: error.response.data?.message,
    });
  }
};

//get filtered models
// export const getFilteredModel =
//   ({ numOfReviews, category, ratings, searchQuery }) =>
//   async (dispatch, getState) => {
//     try {
//       // let link = `${baseURL}/models`;
//       const { data: models } = await axios.get(baseURL);
//       console.log({ models });
//       // return
//       dispatch({
//         type: ALL_MODEL_REQUEST,
//       });

//       let data = models;
//       if (category && category != "") {
//         data = models.filter((i) => i.category == category);
//       }

//       if (ratings && ratings != 0) {
//         data = data.filter((i) => i.ratings >= ratings);
//       }

//       if (
//         numOfReviews != null &&
//         numOfReviews[0] != 0 &&
//         numOfReviews[1] != 15000
//       ) {
//         data = data.filter(
//           (i) =>
//             i.numOfReviews >= numOfReviews[0] &&
//             i.numOfReviews <= numOfReviews[1]
//         );
//       }

//       if (searchQuery != "" && searchQuery)
//         data = data.filter((model) =>
//           Object.values(model).some((prop) =>
//             prop.toString().toLowerCase().includes(searchQuery.toLowerCase())
//           )
//         );

//       console.log(data);
//       dispatch({
//         type: ALL_MODEL_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: ALL_MODEL_FAIL,
//         payload: error.response.data?.message,
//       });
//     }
//   };


export const getFilteredModel =
  (filteredModels) =>
  async (dispatch, getState) => {
    try {
      // return
      dispatch({
        type: FILTERED_MODEL_REQUEST,
      });

      dispatch({
        type: FILTERED_MODEL_SUCCESS,
        payload: filteredModels,
      });
    } catch (error) {
      console.log({error})
      dispatch({
        type: FILTERED_MODEL_FAIL,
        payload: error,
      });
    }
  };

// Create Product
export const createModel = (modelData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_MODEL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${baseURL}/new`,
      modelData,
      config
    );

    dispatch({
      type: NEW_MODEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_MODEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get model details
export const getModelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MODEL_DETAILS_REQUEST,
    });
    const { data } = await axios.get(baseURL);
    const model = data.filter((i) => i.id == id)[0];
    dispatch({
      type: MODEL_DETAILS_SUCCESS,
      payload: model,
    });
  } catch (error) {
    dispatch({
      type: MODEL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get featured model
export const getFeaturedModels = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FEATURED_MODEL_REQUEST,
    });
    const { data } = await axios.get(baseURL);
    console.log({ data });

    const models = data.filter((i) => i.featured);
    dispatch({
      type: FEATURED_MODEL_SUCCESS,
      payload: models,
    });
  } catch (error) {
    dispatch({
      type: FEATURED_MODEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   crearing the error
export const clearingError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
