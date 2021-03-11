import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export interface IMUTQuestion {
    question: number;
    de: string;
    en: string;
}

@Injectable()
export class MUTQuestionService {
    private questions: IMUTQuestion[];
    private mutQuestionUrl: string = "assets/mut_items/mut_questions.json";

    constructor(private http: HttpClient) { }

    public async getMUTQuestion(id: number, language: string = "de"): Promise<string> {
        await this.getQuestions();

        let question = this.questions.find(q => q.question == id);
        return Promise.resolve(language.startsWith("de") ? question.de : question.en);
    }

    public async getNumberOfQuestions(): Promise<number> {
        await this.getQuestions();
        
        return Math.max.apply(Math, this.questions.map(function(o) { return o.question; }))
    }
    private async getQuestions(): Promise<void> {
        if (!this.questions) {
            await this.http.get<IMUTQuestion[]>(this.mutQuestionUrl)
                .toPromise()
                .then((questions) => {
                    this.questions = questions;
                })
                .catch((error: any) => {
                    console.error("Error while trying to read mut questions.");
                    return Promise.reject(error.message || error);
                })
        }
    }

    public async getMUTQuestions(): Promise<IMUTQuestion[]> {
        await this.getQuestions();
        return this.questions;
    }
}