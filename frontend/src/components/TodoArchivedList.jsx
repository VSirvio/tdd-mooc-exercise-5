const TodoArchivedList = ({ items }) => (
  <>
    <h2>Archived items</h2>
    <ul>
      {items?.map(item => <li key={item.id}>{item.content}</li>)}
    </ul>
  </>
);

export default TodoArchivedList;
