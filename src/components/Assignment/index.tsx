import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import type { Assignment } from "../../types";
import { useAssignmentStore } from "../../store";

type AssignmentProps = {
  assignment: Assignment;
}

export function Assignment( { assignment }: AssignmentProps ) {
  const toggleAssignmentCompletion = useAssignmentStore((state) => state.toggleAssignmentCompletion);
  const deleteAssignment = useAssignmentStore((state) => state.deleteAssignment);

  const deadlineDate = new Date(assignment.deadline);
  const today = new Date();

  // Strip time to compare only the date
  [deadlineDate, today].forEach(d => d.setHours(0, 0, 0, 0));

  const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const { label: deadlineLabel, style: bubbleStyle } = 
    daysLeft <= 0 ? { label: "Due: Now", style: { backgroundColor: "#facc15", color: "#000" } } :
    daysLeft === 1 ? { label: "Tomorrow", style: { backgroundColor: "red", color: "#fff" } } :
    { label: `${daysLeft} days left`, style: { backgroundColor: "#3b82f6", color: "#fff" } };


  return (
    <div className={styles.assignment}>
      <div className={styles.grouping}>
        <button className={styles.checkContainer}
          onClick={() => toggleAssignmentCompletion(assignment.id)}
          >
          {assignment.completed ? (
            <BsCheckCircleFill color="#a78bfa" size={20} />
          ) : (
            <BsCircle color="#3b82f6" size={20} />
          )}
        </button>

        <div className={styles.grouping}>
          <p className={assignment.completed ? styles.textCompleted : ""}>
            {assignment.title}
          </p>
          {assignment.completed ?  null : (
            <span className={styles.deadlineBubble} style={bubbleStyle}>
            {deadlineLabel}
            </span>
            )}
        </div>
      </div>


      <button className={styles.deleteButton}
        onClick={() => deleteAssignment(assignment.id)}
        title="Delete Assignment"
        aria-label="Delete Assignment"
        disabled={assignment.completed}
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
}
