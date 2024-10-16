import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
    id: String,
    name: String,
    frequency: "daily" | "weekly",
    completedDated: String[],
    createdAt: String
}

interface HabitState {
    habits: Habit[]
}
const initialState: HabitState = {
    habits: []
}
export const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabit: (state, action: PayloadAction<{ name: String, frequency: "daily" | "weekly" }>) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDated: [],
                createdAt: new Date().toISOString()
            }
            state.habits.push(newHabit);
        },
        toggleHabit: (state, action: PayloadAction<{ id: String, date: String }>) => {
            const habit = state.habits.find((h) => h.id === action.payload.id)
            if (habit) {
                const index = habit.completedDated.indexOf(action.payload.date);
                if (index > -1) {
                    habit.completedDated.splice(index, 1)
                }
                else {
                    habit.completedDated.push(action.payload.date)
                }
            }
        },
        removeHabit: (state, action: PayloadAction<{ id: String }>) => {
            state.habits = state.habits.filter((h) => h.id !== action.payload.id)
        }
    }
})

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions
export default habitSlice.reducer