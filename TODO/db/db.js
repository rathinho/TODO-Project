
/** messages indexes **/
db.getCollection("messages").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** projects indexes **/
db.getCollection("projects").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** users indexes **/
db.getCollection("users").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** messages records **/
db.getCollection("messages").insert({
  "_id": ObjectId("534fd7a1e280103428000004"),
  "content": "haha",
  "from": "wayzh",
  "timestamp": "1397902821099",
  "to": "rathinho"
});
db.getCollection("messages").insert({
  "_id": ObjectId("535249b7e28010c442000000"),
  "content": "hahaha",
  "from": "wayzh",
  "timestamp": "1397902829039",
  "to": "rathinho"
});
db.getCollection("messages").insert({
  "_id": ObjectId("535249bee28010c442000001"),
  "content": "haha",
  "from": "rathinho",
  "timestamp": "1397902824099",
  "to": "wayzh"
});
db.getCollection("messages").insert({
  "_id": ObjectId("53524ab262ba7e6c1876649f"),
  "content": "test",
  "from": "rathinho",
  "timestamp": "1397902829099",
  "to": "wayzh"
});
db.getCollection("messages").insert({
  "from": "rathinho",
  "to": "wayzh",
  "content": "ehehehehe",
  "timestamp": "1397902136680",
  "_id": ObjectId("53524b38e2296d7820d0af82")
});
db.getCollection("messages").insert({
  "from": "rathinho",
  "to": "rathinho",
  "content": "test",
  "timestamp": "1397903190301",
  "_id": ObjectId("53524f56892a0b7c3f99c393")
});

/** projects records **/
db.getCollection("projects").insert({
  "_id": ObjectId("53478035e28010c425000003"),
  "id": "p000000002",
  "project_description": "大学生酸梅计划",
  "project_manager": "Wayzh",
  "project_manager_id": "u0000002",
  "project_name": "大学生酸梅计划",
  "stageSet": [
    {
      "id": "s0000001",
      "order": "一",
      "taskSet": [
        {
          "id": "t0000001",
          "task_manager_id": "u0000002",
          "task_manager_name": "wayzh",
          "avatar_url": "images\/wayzh.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "checking",
          "task_name": "种酸梅"
        },
        {
          "id": "t0000002",
          "task_manager_id": "u0000002",
          "task_manager_name": "wayzh",
          "avatar_url": "images\/wayzh.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "ongoing",
          "task_name": "摘酸梅"
        }
      ]
    },
    {
      "id": "s0000002",
      "order": "二",
      "taskSet": [
        {
          "id": "t0000001",
          "task_manager_id": "u0000001",
          "task_manager_name": "wayzh",
          "avatar_url": "images\/rathinho.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "ongoing",
          "task_name": "吃酸梅"
        }
      ]
    }
  ],
  "userSet": {
    "1": "u0000001",
    "2": "u0000002"
  }
});
db.getCollection("projects").insert({
  "_id": ObjectId("534780dde28010c425000005"),
  "id": "p000000004",
  "project_description": "Yanis Net品牌包装计划",
  "project_manager": "Rathinho",
  "project_manager_id": "u0000001",
  "project_name": "Yanis Net品牌包装计划",
  "stageSet": [
    {
      "id": "s0000001",
      "order": "一",
      "taskSet": [
        {
          "id": "t0000001",
          "task_manager_id": "u0000001",
          "task_manager_name": "rathinho",
          "avatar_url": "images\/rathinho.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "checking",
          "task_name": "Yanis Net品牌包装计划"
        }
      ]
    }
  ],
  "userSet": {
    "1": "u0000001"
  }
});
db.getCollection("projects").insert({
  "_id": ObjectId("53478113e28010c425000006"),
  "id": "p000000005",
  "project_description": "Holly Shit项目2",
  "project_manager": "Wayzh",
  "project_manager_id": "u0000002",
  "project_name": "Holly Shit项目",
  "stageSet": [
    {
      "id": "s0000001",
      "order": "一",
      "taskSet": [
        {
          "id": "t0000001",
          "task_manager_id": "u0000002",
          "task_manager_name": "wayzh",
          "avatar_url": "images\/wayzh.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "checking",
          "task_name": "Holly Shit项目"
        }
      ]
    },
    {
      "id": "s0000002",
      "order": "二",
      "taskSet": [
        {
          "id": "t0000001",
          "task_manager_id": "u0000002",
          "task_manager_name": "wayzh",
          "avatar_url": "images\/wayzh.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "ongoing",
          "task_name": "killing u"
        },
        {
          "id": "t0000001",
          "task_manager_id": "u0000002",
          "task_manager_name": "wayzh",
          "avatar_url": "images\/wayzh.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "ongoing",
          "task_name": "killing u2"
        }
      ]
    }
  ],
  "userSet": {
    "1": "u0000002"
  }
});
db.getCollection("projects").insert({
  "_id": ObjectId("53477ce4e28010c425000002"),
  "id": "p000000001",
  "project_description": "基于微信平台的公司项目管理移动客户端",
  "project_manager": "Rathinho",
  "project_manager_id": "u0000001",
  "project_name": "Loiter项目管理",
  "stageSet": [
    {
      "id": "s0000001",
      "order": "一",
      "taskSet": [
        {
          "id": "t0000001",
          "task_manager_id": "u0000001",
          "task_manager_name": "rathinho",
          "avatar_url": "images\/rathinho.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "checking",
          "task_name": "主要功能设计"
        },
        {
          "id": "t0000002",
          "task_manager_id": "u0000002",
          "task_manager_name": "wayzh",
          "avatar_url": "images\/wayzh.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "ongoing",
          "task_name": "界面优化"
        },
        {
          "id": "t0000003",
          "task_manager_id": "u0000002",
          "task_manager_name": "wayzh",
          "avatar_url": "images\/wayzh.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "finished",
          "task_name": "需求文档"
        }
      ]
    },
    {
      "id": "s0000002",
      "order": "二",
      "taskSet": [
        {
          "id": "t0000001",
          "task_manager_id": "u0000001",
          "task_manager_name": "rathinho",
          "avatar_url": "images\/rathinho.jpg",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "ongoing",
          "task_name": "附加功能实现"
        }
      ]
    },
    {
      "id": "s0000003",
      "order": "三",
      "taskSet": [
        {
          "id": null,
          "task_manager_name": "wayzh",
          "task_name": "hehe",
          "avatar_url": "images\/wayzh.jpg",
          "task_manager_id": "u0000002",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "ongoing"
        },
        {
          "id": "undefined",
          "task_manager_name": "rathinho",
          "task_name": "haha",
          "avatar_url": "images\/rathinho.jpg",
          "task_manager_id": "u0000001",
          "end_timestamp": "1400501436253",
          "start_timestamp": "1400505036253",
          "status": "ongoing"
        }
      ]
    }
  ],
  "userSet": {
    "1": "u0000001",
    "2": "u0000002"
  }
});

/** system.indexes records **/
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "todo.projects",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "todo.users",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "todo.messages",
  "name": "_id_"
});

/** users records **/
db.getCollection("users").insert({
  "_id": ObjectId("53477b28e28010c425000001"),
  "avatar_url": "images\/wayzh.jpg",
  "id": "u0000002",
  "position": "后台开发工程师",
  "priority": 0,
  "projectList": {
    "1": {
      "id": "p000000001",
      "name": "Loiter项目管理"
    },
    "2": {
      "id": "p000000002",
      "name": "大学生酸梅计划"
    }
  },
  "username": "wayzh"
});
db.getCollection("users").insert({
  "_id": ObjectId("532aa7b2e28010c026000001"),
  "avatar_url": "images\/rathinho.jpg",
  "id": "u0000001",
  "position": "前端开发工程师",
  "priority": 1,
  "projectList": {
    "1": {
      "id": "p000000001",
      "name": "Loiter项目管理"
    },
    "2": {
      "id": "p000000002",
      "name": "大学生酸梅计划"
    },
    "3": {
      "id": "p000000003",
      "name": "黄埔军校可视化方案"
    },
    "4": {
      "id": "p000000004",
      "name": "Yanis Net品牌包装计划"
    },
    "5": {
      "id": "p000000005",
      "name": "Holly Shit项目"
    },
    "6": {
      "id": "p000000007",
      "name": "test"
    }
  },
  "username": "rathinho"
});
