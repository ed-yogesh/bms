<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Employee;

class ApiController extends Controller
{
    public function getAllemployee(Request $request) {
        // $employee = Employee::get()->toJson(JSON_PRETTY_PRINT);
        // return response($employee, 200);

        try{
          $take = isset($request->take)?$request->take : 2;
          $skip = isset($request->skip)?$request->skip : 0;
  
          $list = Employee::select('*')
          ->when(!empty($request->searchQuery), function ($query) use ($request) {
              
              if ($request->searchQuery) {
                  return $query->where('emp_name', 'like', '%' . $request->searchQuery . '%');
              }
          })
          
          ->when($request->sortOrder, function ($query) use ($request) {
             
              if ($request->sortOrder) {
                  return $query->orderBy('emp_name', $request->sortOrder)
                               ->orderBy('user_id', $request->sortOrder);
              }
          })
  
          ->paginate($take);
  
  
          return response()->json($list);
  
      }catch(\Exception $e){
          return response()->json($e->getMessage());
      }
      }
}
