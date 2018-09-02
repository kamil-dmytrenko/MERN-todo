import Todo from '../models/Todo';

export const getTodos = (req,res) => {
    Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.send(err))
};

export const createTodo = (req,res) => {
  Todo.create(req.body)
  .then(newTodo => res.status(201).json(newTodo))
  .catch(err => res.send(err))
};

export const getTodo = (req,res) => {
    /** @namespace req.params.todoId */
    Todo.findById(req.params.todoId)
   .then(foundTodo => res.json(foundTodo))
   .catch(err => res.send(err))
};

export const updateTodo = (req,res) => {
   Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
   .then(todo => res.json(todo))
   .catch(err => res.send(err))
};

export const deleteTodo = (req,res) => {
   Todo.deleteOne({_id: req.params.todoId})
   .then(() => res.json({message: 'Success!'}))
   .catch(err => res.send(err))
};
