import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { usePopup } from '../../utils/Popup';
import { createUser } from '../../services/apiService';
import { loginUser } from '../../services/apiService';

const RegisterDialog = ({ open, onClose, onRegister }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const { showPopup } = usePopup();

  useEffect(() => {
    if (open) {
      setName('');
      setPassword('');
      setRePassword('');
    }
  }, [open]);

  const handleRegister = async () => {

    if (!name) {
        showPopup('Preencha um nome de usuário!', 'error'); 
        return;
    }

    if (!password) {
        showPopup('Preencha uma senha para o seu usuário!', 'error'); 
        return;
    }

    if(password !== rePassword){
      showPopup('As senhas não são identicas.', 'error'); 
      return;
    }

    try {
        const registeredUser = await createUser(name, password);
       
        if(registeredUser){
            setName('');
            setPassword('');
            setRePassword('');
            onRegister(); 

            const userSession = {
                id: registeredUser.id,
            };

            localStorage.setItem('session', JSON.stringify(userSession));
            showPopup('Usuário criado com sucesso!', 'success'); 
        }

    } catch (error) {
      showPopup(error.response.data.error, 'error'); 
    }

  };

  const handleLogin = async () => {

    if (!name) {
      showPopup('Preencha seu nome de usuário!', 'error'); 
      return;
  }

  if (!password) {
      showPopup('Preencha sua senha!', 'error'); 
      return;
  }

  try {
      const loggedUserData = await loginUser(name, password);
      
      if(loggedUserData.status){
        setName('');
        setPassword('');
          onRegister(); 
          const userSession = {
              id: loggedUserData.data,
          };

          localStorage.setItem('session', JSON.stringify(userSession));
          showPopup('Usuário logado com sucesso!', 'success'); 
      }else{
        showPopup(loggedUserData.message, 'error'); 
      }

  } catch (error) {
      showPopup(error.response.data.error, 'error'); 
  }
  };

  const handleSwitchMode = () => {
    setName('');
    setPassword('');
    setRePassword('');
    setIsLogin(!isLogin);
  };

return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? 'Faça o seu login' : 'Crie o seu usuário!'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {!isLogin && (
          <TextField
          label="Confirme sua senha"
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSwitchMode} color="primary">
          {isLogin ? 'Não tem uma conta? Crie uma agora.' : 'Já tem uma conta? Faça login.'}
        </Button>
      </DialogActions>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button 
          onClick={isLogin ? handleLogin : handleRegister} 
          color="primary"
        >
          {isLogin ? 'Entrar' : 'Registrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
