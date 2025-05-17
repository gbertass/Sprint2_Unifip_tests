import {test, expect, type Page} from '@playwright/test'

//Teste 1 - Login correto
test('Login PDD FiP', async ({ page }) => {
  await page.goto('https://pddtestev2.gerenciatiunifip.opalstacked.com/login/');
  
  //enter email
  await page.getByRole('textbox', { name: 'Email institucional' }).fill('lucenarobertta@gmail.com');
 
  //enter password
  await page.getByRole('textbox', { name: 'Senha' }).fill('B@nana10');
  
  //click login
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByRole('link', { name: 'PDD PDD Dashboard' })).toBeVisible();
  
  // check if the FIP logo appears
  await page.getByRole('navigation').getByRole('link').first().click();
});


  // Teste 2 - Login com senha inválida
test('Login com senha inválida PDD FiP', async ({ page }) => {
    await page.goto('https://pddtestev2.gerenciatiunifip.opalstacked.com/login/');
    
    //enter email
    await page.getByRole('textbox', { name: 'Email institucional' }).fill('lucenarobertta@gmail.com');
   
    //enter password
    await page.getByRole('textbox', { name: 'Senha' }).fill('w');
    
    //click login
    await page.getByRole('button', { name: 'Entrar' }).click();
    const erro = page.locator('#swal2-title');
    await expect(erro).toHaveText('EMAIL OU SENHA INCORRETO');
    await page.getByRole('button', { name: 'Confirmar' }).click();
});
  
  // Teste 3 - Login com email inválido
test('Login com email inválido', async ({ page }) => {
  await page.goto('https://pddtestev2.gerenciatiunifip.opalstacked.com/login/');

  //enter email
  await page.getByRole('textbox', { name: 'Email institucional' }).fill('l@gmail.com');

  //enter password
  await page.getByRole('textbox', { name: 'Senha' }).fill('B@nana10');

  //click login
  await page.getByRole('button', { name: 'Entrar' }).click();
  const erro = page.locator('#swal2-title');
  await expect(erro).toHaveText('EMAIL NÃO EXISTE');
  await page.getByRole('button', { name: 'Confirmar' }).click();
});
   
  // Teste 6 - Redefinição de senha com campos vazios
  test('redefinir senha sem preencher campos exibe erro', async ({ page }) => {
    await page.goto('https://pddtestev2.gerenciatiunifip.opalstacked.com/login/');
    await page.getByRole('textbox', { name: 'Email institucional' }).fill('lucenarobertta@gmail.com');
    await page.getByRole('textbox', { name: 'Senha' }).fill('B@nana10');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'Profile ROBERTA' }).click();
    await page.waitForSelector('span:text("Perfil")', { timeout: 10000 });
    await page.locator('span', { hasText: 'Perfil' }).click();
    await page.getByRole('link', { name: 'Editar Senha' }).click();
    await page.getByRole('button', { name: 'Redefinir Senha' }).click();
    const inputNovaSenha = page.getByRole('textbox', { name: 'Nova senha' });
  
    // Verifica se o campo é obrigatório
    const isRequired = await inputNovaSenha.evaluate(el => el.hasAttribute('required'));
    expect(isRequired).toBe(true);
  
    // Valida a mensagem de erro nativa do navegador
    const validationMessage = await inputNovaSenha.evaluate(el => el.validationMessage);
    expect(validationMessage).toBe('Please fill out this field.');
  });
  
// Teste 7 - Logout do sistema
test('usuário realiza logout com sucesso', async ({ page }) => {
    await page.goto('https://pddtestev2.gerenciatiunifip.opalstacked.com/login/');
    await page.getByRole('textbox', { name: 'Email institucional' }).fill('lucenarobertta@gmail.com');
    await page.getByRole('textbox', { name: 'Senha' }).fill('B@nana10');
    await page.getByRole('button', { name: 'Entrar' }).click();
    
    const nomeColaborador = page.locator('#id-nome-colaborador');
    await expect(nomeColaborador).toBeVisible(); // por exemplo, verificar se está visível
    await page.waitForLoadState('networkidle')

    await page.getByText('ROBERTA').click({force:true});
    await page.locator('text=Sair').click();
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
});