import { useState } from "react";
import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useAssignmentStore } from "../../store";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; 

export function Header() {
  const [ inputValue, setInputValue ] = useState("");
  const addAssignment = useAssignmentStore((state) => state.addAssignment);
  const [ selectedDate, setSelectedDate ] = useState<Date | undefined>(undefined);
  const [ showDatePicker, setShowDatePicker ] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && selectedDate) {
      addAssignment(inputValue.trim(), selectedDate.toISOString());
      setInputValue(""); 
      setSelectedDate(undefined); 
    }
  };

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form 
        className={styles.newAssignmentForm}
        onSubmit={handleSubmit}>
        <input 
          placeholder="Add a new assignment" 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          />
         
        {showDatePicker ? (
          <div>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setShowDatePicker(false); 
              }}
              disabled={{ before: new Date()}}
              className={styles.datePicker}
            />
          </div>
          ) :
          (<button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            {selectedDate ? selectedDate.toDateString() : "Choose Deadline"}
          </button>) 
        }
        <button
          type="submit"
          disabled={!inputValue.trim() || !selectedDate}
          className= { !inputValue.trim() || !selectedDate ? styles.disabledButton : "" }>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
