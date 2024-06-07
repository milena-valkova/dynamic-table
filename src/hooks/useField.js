const useField = () => {
  const formFieldInputs = [
    { label: "Name: ", id: "name", type: "text" },
    { label: "Color: ", id: "color", type: "color" },
    { label: "Nestment Level: ", id: "nestmentLevel", type: "number" },
    { label: "Vertical Level: ", id: "verticalLevel", type: "number" },
  ];

  const insertNode = (tree, fieldId, item) => {
    if(tree.id === fieldId){
      tree.items.push({
        ...item,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map(obj => {
      return insertNode(obj, fieldId, item);
    });

    return { ...tree, items: latestNode }
  };

  const editNode = (tree, fieldId, item) => {
    if(tree.id === fieldId){
      for (var key in tree) {
        if (tree.hasOwnProperty(key) && item.hasOwnProperty(key)) {
          tree[key] = item[key];
        }
      }
      return tree;
    }

    tree.items.map(obj => {
      return insertNode(obj, fieldId, item);
    });

    return { ...tree }
  };

  const deleteNode = (tree, id) => {

    for(let i = 0; i < tree.length; i++){
      if(tree[i].id === id){
        tree.splice(i, 1);

        return tree;
      }else{
        if(tree[i].items.length){
          deleteNode(tree[i].items, id);
        }
      }
    }

    return tree;
  };

  return {insertNode, editNode, deleteNode, formFieldInputs}
}

export default useField;

