import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/core/Checkbox';

const ToDoItem = ({name, completed, onDelete, onToggle}) => {
  const styles = {
    li: {
      listStyleType: "none",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      textTransform: 'uppercase',
      padding: '0 20px',
      color: '#34495e'
    },
  };
  return (
    <li style={styles.li}>
      <CheckIcon checked={completed} onClick={onToggle}/>
      <p style={styles.text}>
        {name}
      </p>
      <span onClick={onDelete}>
        <CloseIcon style={{ fontSize: 36 }} />
      </span>
    </li>
  )
};

export default ToDoItem;
