import { create } from 'zustand';
import { Assignment } from './types';

interface State {
    assignments: Assignment[];
    deleteAssignment: (id: number) => void;
    addAssignment: (title: string, deadline: string) => void;
    toggleAssignmentCompletion: (id: number) => void;
}

export const useAssignmentStore = create<State>((set) => ({
    assignments: [],    
    deleteAssignment: (id) => set((state) => ({
        assignments: state.assignments.filter((assignment) => assignment.id !== id)
    })),
    addAssignment: (title, deadline) => set((state) => ({
        assignments: [
            ...state.assignments,
            { id: Date.now(), title, completed: false, deadline}
        ]
    })),
    toggleAssignmentCompletion: (id) => set((state) => ({
        assignments: state.assignments.map((assignment) =>
            assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment
        )
    }))
}));
