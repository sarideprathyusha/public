import React from 'react'

const EditableRow = ({editFormData, handleEditFormChange, handleUpdate, handleCancelClick}) => {
    return(
        <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an ID"
          name="ID"
          value={editFormData.ID}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name"
          name="name"
          value={editFormData.name}
        ></input>
      </td>
      <td>
      <input
          type="text"
          required="required"
          placeholder="Enter cost"
          name="cost"
          value={editFormData.cost}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter location"
          name="location"
          value={editFormData.location}
        ></input>
      </td>
      <td>
        <button type="submit" class="btn btn-outline-primary mr-2" onClick={handleUpdate}>Save</button>
        
      </td>
    </tr>
    )
}

export default EditableRow