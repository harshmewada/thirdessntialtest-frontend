import { utilTypes } from "../types";
const initialstate = {
  spinner: false,
  language: "gu",
  modalOpen: undefined,
  modalData: undefined,

  submissionModalOpen: undefined,
  submissionModalData: undefined,
  toggleButton: false,
  isGuideOpen: false,
  isWelcomeGuideOpen: false,

  notifications: [],
};

const utilReducer = (state = initialstate, action) => {
  switch (action.type) {
    case utilTypes.REMOVE_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notifications: state.notifications.filter((f) => f),
      };

    case utilTypes.SET_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case utilTypes.TOGGLE_FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };

    case utilTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case "TOGGLE_BUTTON":
      return {
        ...state,
        toggleButton: !state.toggleButton,
      };

    case utilTypes.TOGGLE_GUIDE:
      return {
        ...state,
        isGuideOpen: !state.isGuideOpen,
      };

    case utilTypes.TOGGLE_WELCOME_GUIDE:
      return {
        ...state,
        isWelcomeGuideOpen: !state.isWelcomeGuideOpen,
      };

    case utilTypes.OPEN_MODAL:
      return {
        ...state,
        modalOpen: action.payload.value,
        modalData: action.payload.data,
      };

    case utilTypes.CLOSE_MODAL:
      return {
        ...state,
        modalOpen: undefined,
        modalData: undefined,
      };

    case utilTypes.OPEN_SUBMISSION_MODAL:
      return {
        ...state,
        submissionModalOpen: action.payload.value,
        submissionModalData: action.payload.data,
      };

    case utilTypes.CLOSE_SUBMISSION_MODAL:
      return {
        ...state,
        submissionModalOpen: undefined,
        submissionModalData: undefined,
      };

    case "SPINNER_START":
      return {
        ...state,
        spinner: true,
      };

    case "SPINNER_STOP":
      return {
        ...state,
        spinner: false,
      };

    default:
      return state;
  }
};

export default utilReducer;
