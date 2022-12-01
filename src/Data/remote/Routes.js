const BASE_URL = "https://nuyou.online/"

const ROUTES = {
CHECK_USER :"check-user",
REGISTER :"register-user",
VERIFY_USER:"verify-user",
LOGIN:"login-user",
RESET_PASSWORD:"reset-password-user",
CHANGE_PASSWORD:"set-new-password-user",
GET_CATEGORIES:"get-categories",
GET_SERVICES: "get-services",
GET_NEARBY_SERVICES :"get-nearby-services",
GET_USERS :"get-users",
BOOK_SERVICE:"booking",
GET_BOOKING_HISTORY:"get-booking-history",
GET_FAVORITES:"get-favourite",
ADD_FAVORITE:"add-favourite",
REMOVE_FAVORITES:"remove-favourite",
UPDATE_BOOKING_STATUS:"update-booking-status",
GET_BOOKING_SLOTS :"get-booking-slot",
ADD_REVIEW :"add-reviews",
GET_REVIEWS:"get-reviews",
UPDATE_USER_PROFILE :"update-user-profile",
SEND_USER_NOTIFICATION : "send-user-notification",
SEND_PROVIDER_NOTIFICATION:'send-provider-notification',
USER_IS_NOTIFY : 'user-is-notify',
DELETE_USER_ACCOUNT: "delete-user-account",
GET_GALLERY_IMAGE: 'get-gallery-images',
}

export {
    BASE_URL,ROUTES
}