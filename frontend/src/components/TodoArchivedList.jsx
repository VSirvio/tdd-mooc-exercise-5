const TodoArchivedList = ({ items }) => (
  <>
    <h2>Archived items</h2>
    <ul>
      <li>{items?.[0].content}</li>
    </ul>
  </>
);

export default TodoArchivedList;
