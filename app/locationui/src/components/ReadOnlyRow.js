import React from 'react';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const ReadOnlyRow = ({items , deleteItem, updateCost}) => {
    return(
        <tr>
        <td>{items.ID}</td>
        <td>{items.name}</td>
        <td>{items.cost}
        </td>
        <td>{items.location}</td>
        <td>
        <EditOutlined  onClick={(event) => updateCost(event, items)} style={{color:'blue', margin:12}}/>
        {/* <button class="btn btn-outline-primary mr-2" onClick={(event) => updateCost(event, items)}>Edit</button>   */}
        <DeleteOutlined  onClick={() => deleteItem(items.ID)} style={{color:'red', margin:12}}/>
        {/* <button class="btn btn-danger" onClick={() => deleteItem(items.ID)}>Delete</button> */}
        </td>
      </tr>
    )
}

export default ReadOnlyRow