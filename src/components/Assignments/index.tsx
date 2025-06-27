import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { useAssignmentStore } from "../../store";



export function Assignments() {
  const assignments = useAssignmentStore((state) => state.assignments);
  const total = assignments.length;
  const completed = assignments.filter((assignment) => assignment.completed).length;

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{total}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{completed} of {total}</span>
        </div>
      </header>
      {assignments.map((assignment) => (
        <div key={assignment.id} className={styles.list}>
          <Assignment assignment={assignment}/>
        </div>
      ))}
    </section>
  );
}
