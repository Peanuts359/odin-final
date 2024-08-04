import { addEscKeyDownListener, disableScrolling } from "../scripts/script";
import { useEffect } from "react";

function ConfirmDeletePopup({ deletePost, setConfirmDeletePopupShown }) {
  useEffect(() => {
    const enableScrolling = disableScrolling();
    const removeEscKeyDownListener = addEscKeyDownListener(
      setConfirmDeletePopupShown
    );

    return () => {
      enableScrolling();
      removeEscKeyDownListener();
    };
  }, []);

  async function handleConfirmDeleteBtnClicked() {
    await deletePost();
    closeConfirmDeletePopup();
  }

  function closeConfirmDeletePopup() {
    setConfirmDeletePopupShown(false);
  }

  return (
    <div className="ConfirmDeletePopup">
      <div className="window">
        <div className="title-bar">
          <button
            type="button"
            className="close-btn"
            onClick={closeConfirmDeletePopup}
          >
            ✕
          </button>
          <div className="title">Deleting post</div>
        </div>
        <div className="content">
          Sure you want to delete this post? There's no 'undo' button.
          <div className="delete-btns">
            <button className="cancel-btn" onClick={closeConfirmDeletePopup}>
              Cancel
            </button>
            <button
              className="confirm-btn"
              onClick={handleConfirmDeleteBtnClicked}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeletePopup;