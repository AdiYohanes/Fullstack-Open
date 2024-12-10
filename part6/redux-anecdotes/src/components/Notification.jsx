import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  // Menentukan gaya berdasarkan jenis notifikasi
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    backgroundColor:
      notification.type === "success"
        ? "lightgreen" // Green for success
        : notification.type === "error"
        ? "lightcoral" // Red for error
        : notification.type === "delete"
        ? "lightcoral" // Red for delete action
        : notification.type === "vote"
        ? "lightblue" // Blue for vote action
        : "lightgray", // Default gray
    color:
      notification.type === "success"
        ? "green" // Green text for success
        : notification.type === "error"
        ? "red" // Red text for error
        : notification.type === "delete"
        ? "red" // Red text for delete
        : notification.type === "vote"
        ? "blue" // Blue text for vote
        : "black", // Default black text
    visibility: notification.message ? "visible" : "hidden", // Show or hide based on message
  };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
