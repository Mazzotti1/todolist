import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControl, InputLabel, Select, MenuItem, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {createTask } from '../../services/apiService';
import { usePopup } from '../../utils/Popup';
import RegisterDialog from './RegisterDialog';

const CreateTaskDialog = ({ open, handleClose,  onTaskCreated}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

    const { showPopup } = usePopup();

    useEffect(() => {
        if (!open) { 
            setTitle('');
            setDescription('');
            setTags([]);
            setIsCompleted(false);
            setPriority('');
            setCategory('');
            setDueDate(null); 
        }
    }, [open]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleTagsChange = (tag) => {
        setTags((prevTags) => 
            prevTags.includes(tag) 
            ? prevTags.filter((item) => item !== tag) 
            : [...prevTags, tag]
        );
    };

    const handleCompletionChange = (event) => {
        setIsCompleted(event.target.checked);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const openRegister = () => {
        setOpenRegisterDialog(true);
    };
    
    const closeRegisterDialog = () => {
    setOpenRegisterDialog(false);
    };

    const handleCreateTask = async () => {

        if(!title){
            showPopup("Preencha o titulo da tarefa", 'error'); 
            return;
        }

        if (!dueDate || new Date(dueDate) <= new Date()) {
            showPopup("Preencha a data com um dia posterior ao dia de hoje.", 'error');
            return;
        }

        if (!localStorage.getItem('session')) {
            openRegister();
            return;
        }

        const newTaskData = {
            title,
            description,
            tags,
            isCompleted,
            priority,
            category,
            dueDate
        };

        try {
            const createdTask = await createTask(newTaskData);
            
            if(createdTask){
                onTaskCreated(createdTask);

                setTitle('');
                setDescription('');
                setTags([]);
                setIsCompleted(false);
                setPriority('');
                setCategory('');
                setDueDate(null);
                handleClose();

                showPopup('Tarefa criada com sucesso!', 'success'); 
            }

        } catch (error) {
            showPopup(error.response.data.error, 'error'); 
        }
    };

    return (
        <Dialog open={open} 
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#f9f9f9',
                        borderRadius: '16px',
                        padding: '24px',
                        width: '500px',
                    },
                }}
                >
            <DialogTitle>Adicionar Tarefa</DialogTitle>
            <DialogContent>
                <TextField
                    label="Título da tarefa"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={handleTitleChange}
                    margin="normal"
                />
                <TextField
                    label="Descrição da tarefa"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}
                    margin="normal"
                />

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems:'center', marginTop: '16px' }}>
                    <h4>Tags</h4>
                    <div>
                        <Button 
                            variant={tags.includes('Rápida') ? 'contained' : 'outlined'} 
                            onClick={() => handleTagsChange('Rápida')}
                            style={{ marginRight: '8px' }}
                        >
                            Rápida
                        </Button>
                        <Button 
                            variant={tags.includes('Devagar') ? 'contained' : 'outlined'} 
                            onClick={() => handleTagsChange('Devagar')}
                            style={{ marginRight: '8px' }}
                        >
                            Lenta
                        </Button>
                        <Button 
                            variant={tags.includes('Fácil') ? 'contained' : 'outlined'} 
                            onClick={() => handleTagsChange('Fácil')}
                            style={{ marginRight: '8px' }}
                        >
                            Fácil
                        </Button>
                        <Button 
                            variant={tags.includes('Difícil') ? 'contained' : 'outlined'} 
                            onClick={() => handleTagsChange('Difícil')}
                        >
                            Difícil
                        </Button>
                    </div>
                </div>

                <FormControlLabel
                    control={<Checkbox checked={isCompleted} onChange={handleCompletionChange} />}
                    label="Foi concluída?"
                    style={{ marginTop: '16px' }}
                />

                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                    <InputLabel>Prioridade</InputLabel>
                    <Select
                        value={priority}
                        onChange={handlePriorityChange}
                        label="Prioridade"
                    >
                        <MenuItem value="high">Alta</MenuItem>
                        <MenuItem value="medium">Média</MenuItem>
                        <MenuItem value="low">Baixa</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                        value={category}
                        onChange={handleCategoryChange}
                        label="Categoria"
                    >
                        <MenuItem value="Trabalho">Trabalho</MenuItem>
                        <MenuItem value="Estudo">Estudo</MenuItem>
                        <MenuItem value="Lazer">Lazer</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Data de Conclusão"
                        value={dueDate}
                        onChange={(newDate) => setDueDate(newDate)}  
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                        format="dd/MM/yyyy"
                        sx={{ marginTop: '16px' }}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleCreateTask} color="primary">
                    Adicionar
                </Button>
            </DialogActions>
            <RegisterDialog 
                open={openRegisterDialog} 
                onClose={closeRegisterDialog} 
                onRegister={closeRegisterDialog} 
            />
        </Dialog>
    );
};

export default CreateTaskDialog;
