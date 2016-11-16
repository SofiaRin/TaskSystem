class TaskService {
    private observerList: Observer[] = [];

    //private taskList:Task[] = [];

    private taskList: {

        [index: string]: Task

    } = {};

    private static instance;
    private static count = 0;



    constructor() {
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!!';
        }
    }



    public static getInstance() {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    }



    private getTaskByCustomRule(rule: Function): Task {

        return rule(this.taskList);

    }



    public finish(id: string): ErrorCode {
        if (id == null) {
            return ErrorCode.NULLTASK_ID;
        }

        var task = this.taskList[id];

        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }

        task.status = TaskStatus.SUBMITTED;
        console.log(task.name + " Mission Successed!");
        this.notify(task);
        return ErrorCode.SUCCESSED;
    }


    public readyToSubmit(id: string) {
        if (id == null) {
            return ErrorCode.NULLTASK_ID;
        }

        var task = this.taskList[id];

        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }

        task.status = TaskStatus.CAN_SUBMIT;
        console.log(task.name + " Mission Ready to Submit!");
        this.notify(task);
        return ErrorCode.SUCCESSED;
    }


    public accept(id: string): ErrorCode {
        if (id == null) {
            return ErrorCode.NULLTASK_ID;
        }

        var task = this.taskList[id];

        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        
        task.status = TaskStatus.DURING;
        console.log(task.name + " Mission Accept!");
        this.notify(task);
        return ErrorCode.SUCCESSED;

    }



    public addTask(task: Task) {

        this.taskList[task.id] = task;

    }


    public addObserver(_observer: Observer): void {

        this.observerList.push(_observer);

    }



    private notify(task: Task): void {

        for (var i = 0; i < this.observerList.length; i++) {

            this.observerList[i].onChange(task);
        }
    }
}

enum ErrorCode {
    SUCCESSED = 0,
    MISSING_TASK = 1,
    NULLTASK_ID = 2

}