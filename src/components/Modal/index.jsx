import "./index.scss";

const Modal = ({ courseDetails }) => {
  return (
    <>
      <div className="container">
        <div className="interior">
          <a className="btn" href={`#open-modal-${courseDetails.id}`}>
            Details
          </a>
        </div>
      </div>
      <div id={`open-modal-${courseDetails.id}`} className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close">
            Close
          </a>
          {courseDetails.title?.rendered === undefined ? (
            <h2>{courseDetails.title}</h2>
          ) : (
            <h2
              dangerouslySetInnerHTML={{ __html: courseDetails.title.rendered }}
            ></h2>
          )}
          {courseDetails.content?.rendered === undefined ? (
            <div>
              <div
                className="ModalDescription"
                dangerouslySetInnerHTML={{ __html: courseDetails.description }}
              ></div>

              <div className="Status">
                Status:{" "}
                {courseDetails.is_enrolled ? "Enrolled" : "Not Enrolled"}
              </div>
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: courseDetails.content.rendered,
              }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
