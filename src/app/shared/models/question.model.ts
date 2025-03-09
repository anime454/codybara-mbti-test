export interface Question {
    id: number;
    text: string;
    dimension: "E/I" | "S/N" | "T/F" | "J/P";
    positive: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
}

