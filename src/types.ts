export type StateType = {
  tasks: {
    tasks: TaskType[];
    taskAdderOpened: boolean;
    searchTaskReq: string;
    searchTask: TaskType[];
    dragTaskId: null | number;
    dragTaskTarget: null | string;
    fullTaskOpened: boolean;
    fullTaskOpenedId: null | number;
    updatedSubtaskId: null | number;
    updatedSubtask: SubtaskType[];
    createSubtask: null | SubtaskType;
    commentCreatorOpened: boolean;
    subcommentCreatorOpened: boolean;
    subtasks: SubtaskType[];
    editedFields: {
      title: string;
      description: string;
    };
    task: {
      number: string;
      title: string;
      endDate: null | string;
      priority: string;
      sectionName: string;
      projectIndex: number;
      files: string[];
      subtask: string[];
      created: Date;
    };
    comment: CommentType;
    comments: CommentType[];
    subcomment: CommentType;
    subcomments: CommentType[];
    currentCommentId: null | number;
  };

  projects: {
    projects: ProjectType[];
    projectAdderOpened: boolean;
    projectName: string;
    projectId: null;
    isRouting: boolean;
  };
};
export type ProjectType = {
  id: number;
  created_at: string;
  title: string;
};

export type TaskType = {
  id: number;
  number: string;
  title: string;
  endDate: string;
  priority: string;
  sectionName: string;
  projectIndex: number;
  files: string[];
  subtask: string[];
  description: string;
  created: Date;
};

export type SubtaskType = {
  taskId: number;
  id: number;
  status: boolean;
  text: string;
};

export type CommentType = {
  id: number;
  created_at: string;
  taskIndex: number;
  commentator: null | string;
  comment: null | string;
  parentCommentId: null | number;
};
