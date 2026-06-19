import axios from "axios";
import { server } from "../../server";
// create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "createEventRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );

    dispatch({
      type: "createEventSuccess",
      payload: data.event,
    });

  } catch (error) {
    dispatch({
      type: "createEventFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};


// get All Events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/event/get-all-events/${id}`
    );
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// get All Events of a shop
export const getAllEvents= (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(
      `${server}/event/get-all-events`
    );
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};


// delete events of a shop

export const deleteEvent = (id) => async (dispatch) =>{
  try {
    dispatch({
      type : "deleteeventRequest"
    })

    const { data} = await axios.delete(`${server}/event/delete-shop-event/${id}`,
     {withCredentials:true}
    )
  dispatch({
      type: "deleteeventSuccess",
      payload: data.messaage,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });

  }
}