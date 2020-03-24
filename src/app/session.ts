export class Session {
    id: string;
    name;
    numberOfVoters;
    stories: any;
    voterId: string;
    voters: Array<string>;
    activeStory: number;
}
