import React, {useState} from "react";
import {axiosWithAuth} from '../Utils/axiosWithAuth';

const initialColor = {
    color: "",
    code: {hex: "#"}
};

const ColorList = ({colors, updateColors}) => {
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);
    const [colorToAdd, setColorToAdd] = useState(initialColor);
    console.log(colorToAdd)

    const editColor = color => {
        setEditing(true);
        setColorToEdit(color);
    };

    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/colors/${colorToEdit.id}`, colorToEdit)
            .then(res => {
                updateColors(colors.map(color => {
                    return color.id === res.data.id ? res.data : color;
                }));
                setEditing(false);
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const deleteColor = color => {
        axiosWithAuth()
            .delete(`/colors/${color.id}`)
            .then(res => {
                const filterList = colors.filter(filterColor => filterColor.id !== color.id);
                updateColors(filterList);
            })
            .catch(error => {
                console.log(error.message);
            });

    };

    const addColor = e => {
      e.preventDefault();
      axiosWithAuth()
          .post('/colors/',colorToAdd)
          .then(res => {
            console.log('add color res',res)
            updateColors(res.data)
            setColorToAdd(initialColor)
          })
    };

    return (
        <div className='colors-wrap'>
            <p>colors</p>
            <ul>
                {colors.map(color => (
                    <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
              }
              }>
                  x
              </span>{" "}
                {color.color}
            </span>
                        <div
                            className='color-box'
                            style={{backgroundColor: color.code.hex}}
                        />
                    </li>
                ))}
            </ul>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            onChange={e =>
                                setColorToEdit({...colorToEdit, color: e.target.value})
                            }
                            value={colorToEdit.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={e =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: {hex: e.target.value}
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label>
                    <div className='button-row'>
                        <button type='submit'>save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </div>
                </form>
            )}
            {!editing && (<form onSubmit={e => addColor(e)}>
                <legend>add color</legend>
                <label>
                    color name:
                    <input
                        onChange={e =>
                            setColorToAdd({...colorToAdd, color: e.target.value})
                        }
                        value={colorToAdd.color}
                    />
                </label>
                <label>
                    hex code:
                    <input
                        onChange={e =>
                            setColorToAdd({
                                ...colorToAdd,
                                code: {hex: e.target.value}
                            })
                        }
                        value={colorToAdd.code.hex}
                    />
                </label>
                <div className='button-row'>
                    <button type='submit'>save</button>
                </div>
            </form>)}

            <div className='spacer'/>
        </div>
    );
};

export default ColorList;
