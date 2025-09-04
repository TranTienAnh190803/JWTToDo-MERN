import { CronJob } from "cron";
import { Todo } from "../Models/TodoModel.js";

const checkDeadline = new CronJob(
    "* * * * *",
    async () => {
        try {
            await Todo.updateMany(
                {$and: [{deadline: {$lt: Date.now()}}, {state: "In progress"}]},
                {$set: {state: "Overdue"}}
            )
        } catch (error) {
            return
        }
    },
    null,
    false
)

checkDeadline.start();