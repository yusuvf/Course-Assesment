import Modal from "../Modal/index";
import "./index.scss";

const Card = ({ course }) => {
  return (
    <div className="CardContainer">
      <a href={course.link} className="CardHeader">
        {course.title?.rendered === undefined ? (
          <h3 className="HeaderText">{course.title}</h3>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: course.title.rendered }}
            className="HeaderText"
          ></div>
        )}
      </a>
      <div className="CardContent">
        <Modal courseDetails={course} className="ModalButton" />
      </div>
    </div>
  );
};

export default Card;
