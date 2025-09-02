import { Todo } from "../Models/TodoModel.js";

export const addWork = async (req, res) => {
    let newWork = req.body;

    try {
        newWork = {...newWork, user: req.user.userId, state: "In progress"};
        await Todo.create(newWork);
        return res.status(201).json({success: true, message: "Add New Work Successfully"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export const getWorks = async (req, res) => {
    try {
        const works = await Todo.find({user: req.user.userId}).select("work state");

        if (works.length <= 0) {
            return res.status(200).json({success: true, message: "There Is No Work To Do", works: null})
        }

        return res.status(200).json({success: true, works: works});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const editWork = async (req, res) => {
    const editedWork = req.body;
    const {workId} = req.params;

    try {
        const selectedWork = await Todo.findOneAndUpdate({_id: workId, user: req.user.userId}, 
                                                        editedWork, 
                                                        {new: true, runValidators: true})
                                        .select("work state");

        if (selectedWork) {
            return res.status(200).json({success: true, message: "Edited Successfully", data: selectedWork});
        }

        return res.status(404).json({success: false, message: "Not Found"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const deleteWork = async (req, res) => {
    const {workId} = req.params;

    try {
        const selectedWork = await Todo.findOneAndDelete({_id: workId, user: req.user.userId})

        if (selectedWork) {
            return res.status(200).json({success: true, message: "Delete Successfully"});
        }

        return res.status(404).json({success: false, message: "Not Found"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export const verifyWork = async (req, res) => {
    const {workId} = req.params;

    try {
        const selectedWork = await Todo.findOneAndUpdate({_id: workId, user: req.user.userId}, {state: "Done"}, {new: true, runValidators: true});

        if (selectedWork && selectedWork.state === "In progress") {
            return res.status(200).json({success: true, message: "Work Done", data: selectedWork})
        }
        else if (selectedWork && selectedWork.state !== "In progress") {
            return res.status(400).json({success: false, message: "Work Already Done"});
        }
        else {
            return res.status(404).json({success: false, message: "Not Found"});
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}