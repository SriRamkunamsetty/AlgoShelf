let nextNodeId = 1;

export function createNode(value) {
  return {
    id: `node-${nextNodeId++}`,
    value: Number(value),
  };
}

export function createInitialList() {
  const initialValues = [10, 25, 40, 65];
  return initialValues.map((val) => createNode(val));
}

export function insertBeginning(list, value) {
  const steps = [];
  const newNode = createNode(value);

  steps.push({
    activeNodeId: newNode.id,
    highlightIndex: -1,
    relinkIndex: -1,
    newNode,
    listSnapshot: [...list],
    description: `Allocated new node with value ${value}. Pointer next is currently unbound.`,
  });

  steps.push({
    activeNodeId: newNode.id,
    highlightIndex: 0,
    relinkIndex: 0,
    newNode,
    listSnapshot: [...list],
    description: `Pointed new node's next reference to the current Head (${
      list.length > 0 ? list[0].value : "NULL"
    }).`,
  });

  const updatedList = [newNode, ...list];

  steps.push({
    activeNodeId: newNode.id,
    highlightIndex: 0,
    relinkIndex: -1,
    newNode: null,
    listSnapshot: updatedList,
    description: `Updated Head pointer to the new node. Insert at beginning completed in O(1) time.`,
  });

  return {
    list: updatedList,
    steps,
    success: true,
    message: `Successfully inserted ${value} at beginning of linked list.`,
  };
}

export function insertEnd(list, value) {
  const steps = [];
  const newNode = createNode(value);

  if (list.length === 0) {
    return insertBeginning(list, value);
  }

  steps.push({
    activeNodeId: newNode.id,
    highlightIndex: -1,
    relinkIndex: -1,
    newNode,
    listSnapshot: [...list],
    description: `Allocated new node with value ${value}.`,
  });

  // Traverse to tail
  for (let i = 0; i < list.length; i++) {
    steps.push({
      activeNodeId: list[i].id,
      highlightIndex: i,
      relinkIndex: -1,
      newNode,
      listSnapshot: [...list],
      description:
        i === list.length - 1
          ? `Reached Tail node (${list[i].value}) whose next pointer is NULL.`
          : `Traversing: Inspecting node at index ${i} (${list[i].value}).`,
    });
  }

  const updatedList = [...list, newNode];

  steps.push({
    activeNodeId: newNode.id,
    highlightIndex: list.length,
    relinkIndex: list.length - 1,
    newNode: null,
    listSnapshot: updatedList,
    description: `Linked previous tail's next pointer to new node. Tail insertion complete.`,
  });

  return {
    list: updatedList,
    steps,
    success: true,
    message: `Successfully inserted ${value} at the end of the linked list.`,
  };
}

export function insertAtPosition(list, value, pos) {
  const position = Number(pos);
  if (position < 0 || position > list.length) {
    return {
      list,
      steps: [],
      success: false,
      message: `Invalid position ${position}. Valid range is 0 to ${list.length}.`,
    };
  }

  if (position === 0) {
    return insertBeginning(list, value);
  }
  if (position === list.length) {
    return insertEnd(list, value);
  }

  const steps = [];
  const newNode = createNode(value);

  steps.push({
    activeNodeId: newNode.id,
    highlightIndex: -1,
    relinkIndex: -1,
    newNode,
    listSnapshot: [...list],
    description: `Allocated new node with value ${value}. Seeking index ${position}.`,
  });

  // Traverse to position - 1
  for (let i = 0; i < position; i++) {
    steps.push({
      activeNodeId: list[i].id,
      highlightIndex: i,
      relinkIndex: -1,
      newNode,
      listSnapshot: [...list],
      description:
        i === position - 1
          ? `Reached predecessor node at index ${i} (${list[i].value}). Ready to insert after this node.`
          : `Traversing: Inspecting node at index ${i} (${list[i].value}).`,
    });
  }

  steps.push({
    activeNodeId: newNode.id,
    highlightIndex: position,
    relinkIndex: position - 1,
    newNode,
    listSnapshot: [...list],
    description: `Pointed new node's next to index ${position} (${list[position].value}).`,
  });

  const updatedList = [
    ...list.slice(0, position),
    newNode,
    ...list.slice(position),
  ];

  steps.push({
    activeNodeId: newNode.id,
    highlightIndex: position,
    relinkIndex: -1,
    newNode: null,
    listSnapshot: updatedList,
    description: `Linked predecessor node (${
      list[position - 1].value
    })'s next pointer to new node. Insert at position ${position} complete.`,
  });

  return {
    list: updatedList,
    steps,
    success: true,
    message: `Successfully inserted ${value} at position ${position}.`,
  };
}

export function deleteBeginning(list) {
  if (list.length === 0) {
    return {
      list,
      steps: [],
      success: false,
      message: "Cannot delete from an empty linked list.",
    };
  }

  const steps = [];
  const deletedNode = list[0];

  steps.push({
    activeNodeId: deletedNode.id,
    highlightIndex: 0,
    relinkIndex: -1,
    deletedNodeId: deletedNode.id,
    listSnapshot: [...list],
    description: `Inspecting Head node (${deletedNode.value}) to be deleted.`,
  });

  const updatedList = list.slice(1);

  steps.push({
    activeNodeId: updatedList.length > 0 ? updatedList[0].id : null,
    highlightIndex: 0,
    relinkIndex: -1,
    deletedNodeId: deletedNode.id,
    listSnapshot: updatedList,
    description: `Advanced Head pointer to ${
      updatedList.length > 0 ? updatedList[0].value : "NULL"
    }. Detached previous Head.`,
  });

  return {
    list: updatedList,
    steps,
    success: true,
    message: `Successfully deleted node ${deletedNode.value} from beginning.`,
  };
}

export function deleteEnd(list) {
  if (list.length === 0) {
    return {
      list,
      steps: [],
      success: false,
      message: "Cannot delete from an empty linked list.",
    };
  }

  if (list.length === 1) {
    return deleteBeginning(list);
  }

  const steps = [];

  for (let i = 0; i < list.length - 1; i++) {
    steps.push({
      activeNodeId: list[i].id,
      highlightIndex: i,
      relinkIndex: -1,
      deletedNodeId: null,
      listSnapshot: [...list],
      description:
        i === list.length - 2
          ? `Reached second-to-last node at index ${i} (${list[i].value}). Next node (${
              list[list.length - 1].value
            }) will be deleted.`
          : `Traversing toward tail: at node ${list[i].value}.`,
    });
  }

  const deletedNode = list[list.length - 1];
  const updatedList = list.slice(0, list.length - 1);

  steps.push({
    activeNodeId: updatedList[updatedList.length - 1].id,
    highlightIndex: updatedList.length - 1,
    relinkIndex: updatedList.length - 1,
    deletedNodeId: deletedNode.id,
    listSnapshot: updatedList,
    description: `Set new tail (${
      updatedList[updatedList.length - 1].value
    })'s next pointer to NULL. Node ${deletedNode.value} successfully removed.`,
  });

  return {
    list: updatedList,
    steps,
    success: true,
    message: `Successfully deleted tail node ${deletedNode.value}.`,
  };
}

export function deleteAtPosition(list, pos) {
  const position = Number(pos);
  if (list.length === 0) {
    return {
      list,
      steps: [],
      success: false,
      message: "Cannot delete from an empty linked list.",
    };
  }

  if (position < 0 || position >= list.length) {
    return {
      list,
      steps: [],
      success: false,
      message: `Invalid position ${position}. Valid range is 0 to ${
        list.length - 1
      }.`,
    };
  }

  if (position === 0) {
    return deleteBeginning(list);
  }
  if (position === list.length - 1) {
    return deleteEnd(list);
  }

  const steps = [];

  for (let i = 0; i < position; i++) {
    steps.push({
      activeNodeId: list[i].id,
      highlightIndex: i,
      relinkIndex: -1,
      deletedNodeId: null,
      listSnapshot: [...list],
      description:
        i === position - 1
          ? `Reached predecessor node at index ${i} (${list[i].value}). Target to delete is node at index ${position} (${list[position].value}).`
          : `Traversing: Inspecting node at index ${i} (${list[i].value}).`,
    });
  }

  const deletedNode = list[position];
  const updatedList = [
    ...list.slice(0, position),
    ...list.slice(position + 1),
  ];

  steps.push({
    activeNodeId: list[position - 1].id,
    highlightIndex: position - 1,
    relinkIndex: position - 1,
    deletedNodeId: deletedNode.id,
    listSnapshot: updatedList,
    description: `Bypassed target node ${deletedNode.value}: Linked predecessor (${
      list[position - 1].value
    }) directly to successor (${
      list[position + 1].value
    }). Node ${deletedNode.value} removed.`,
  });

  return {
    list: updatedList,
    steps,
    success: true,
    message: `Successfully deleted node ${deletedNode.value} at position ${position}.`,
  };
}
