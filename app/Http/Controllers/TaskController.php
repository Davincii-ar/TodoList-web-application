<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller {
	// apply auth middleware so only authenticated users have access
	public function __construct() {
		$this->middleware('auth');
	}

	public function index(Request $request, Task $task) {
		// get all the tasks based on current user id
		$allTasks = $task->whereIn('user_id', $request->user())->with('user');
		$tasks = $allTasks->orderBy('created_at', 'desc')->take(10)->get();
		// return json response
		return response()->json([
			'tasks' => $tasks, 
		]);
	}

	public function create() {
		//
	}

	public function store(Request $request) {
		// validate
		$this->validate($request, [
			'name' => 'required|max:255',
		]);
		// create a new task based on user tasks relationship
		$task = $request->user()->tasks()->create([
			'name' => $request->name,
		]);
		// return task with user object
		return response()->json($task->with('user')->find($task->id));
	}

	public function show($id) {
		//
	}

	public function edit($id) {
		$task = Task::findOrFail($id);
		return response()->json([
			'task' => $task,
		]);
	}

	public function update(Request $request, $id) {
		// update task
		$input = $request->all();
		$task = Task::findOrFail($id);
		$task->update($input);
		return response()->json($task->with('user')->find($task->id));
	}

	public function destroy($id) {
		Task::findOrFail($id)->delete();
	}
}