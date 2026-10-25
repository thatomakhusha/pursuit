export type Application = {
    id: number;
    title: string;
    organisation: string | null;
    type: string;
    status: string;
    deadline: string | null;
    source_url: string | null;
    notes: string | null;
};