import {test, expect} from '@playwright/test'

  test('Select a PDD Dashboard', async ({page}) => {

    await page.goto('https://pddtestev2.gerenciatiunifip.opalstacked.com/login/');
    await page.getByRole('textbox', { name: 'Email institucional' }).fill('grazielebp@hotmail.com');
    await page.getByRole('textbox', { name: 'Senha' }).fill('Gb.300694');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await expect(page).toHaveURL('https://pddtestev2.gerenciatiunifip.opalstacked.com/inicio/');
    
    const pdd = page.getByRole('link', { name: 'PDD PDD Dashboard' })
    await pdd.click();
    await expect(page).toHaveURL('https://pddtestev2.gerenciatiunifip.opalstacked.com/informacoesGerais/dashboard_pdd')

    const ads = page.locator('.card-title');
    await expect(ads).toBeVisible();


    const pdd_click = page.getByRole('link', { name: 'Incompleto' });
    await pdd_click.click();
    
    const cronograma = page.locator('#tab-3').getByRole('heading', { name: 'Cronograma' })
    await expect(cronograma).toBeVisible();

    const editar = page.locator('img[alt="Editar"]');
    await page.waitForLoadState('networkidle');

    await page.waitForLoadState('networkidle');

    await expect(editar).toBeVisible();
    await editar.click({ force: true });

    const novaAula = page.locator('#modalNovaAula');
    await expect(novaAula).toBeVisible({ timeout: 7000 });
    
    const conteudo =  page.getByRole('textbox', { name: 'Conteúdo' })
    await conteudo .click({force: true});
    const textoAtual = await conteudo .inputValue();
    for (let i = 0; i <= textoAtual.length; i++) {
    await conteudo .press('Backspace');
    }

    await conteudo.fill('TRIO MARAVILHA');
    const toast = page.locator('#toast_cronograma_ch');
    const fecharBotao = toast.locator('button.btn-close');
    await fecharBotao.click();
    
    const salvarBotao = page.getByRole('button', { name: 'Salvar' });
    await salvarBotao.click();

    const toastSuccess = page.locator('.swal2-popup.swal2-modal.swal2-icon-success.swal2-show');
    await toastSuccess.waitFor({ state: 'visible', timeout: 5000 });
    await expect(toastSuccess).toBeVisible();
    
    const confirmBotao = page.getByRole('button', { name: 'Confirmar' });
    await confirmBotao.click();

    await expect(cronograma).toBeVisible();

  });

      // Teste 5 - Pesquisa de PDD por semestre e status
test('pesquisa PDD por semestre e status retorna resultado esperado', async ({ page }) => {
  await page.goto('https://pddtestev2.gerenciatiunifip.opalstacked.com/login/');

  // enter email 
  await page.getByRole('textbox', { name: 'Email institucional' }).fill('lucenarobertta@gmail.com');

  //enter senha
  await page.getByRole('textbox', { name: 'Senha' }).fill('B@nana10');

  // click login
  await page.getByRole('button', { name: 'Entrar' }).click();

  //click PDD
  await page.getByRole('link', { name: 'PDD PDD Dashboard' }).click();
  //click persquisar
  await page.waitForLoadState('networkidle');
  const botaoPesquisar = page.locator('li:has(#bt-search-pdd)');
  await expect(botaoPesquisar).toBeVisible();
  await botaoPesquisar.click({force:true});
  

  const campoSemestre = page.getByText('2024.2 2024.1 Semestre');
  await expect(campoSemestre).toBeVisible();
  await page.selectOption('#id_semestre', '2024.1');

  await page.getByLabel('Status do PDD').selectOption('Incompleto');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByText('PDD não encontrado')).toBeVisible();
});

 // Teste 4 Acesso à aba de configurações e salvar preferências
 test('Acesso e salvamento de configurações de acessibilidade', async ({ page }) => {
  await page.goto('https://pddtestev2.gerenciatiunifip.opalstacked.com/login/');

  //enter email 
  await page.getByRole('textbox', { name: 'Email institucional' }).fill('lucenarobertta@gmail.com');

  //enter senha
  await page.getByRole('textbox', { name: 'Senha' }).fill('B@nana10');

  //click login
  await page.getByRole('button', { name: 'Entrar' }).click();


  const nomeColaborador = page.locator('#id-nome-colaborador');
  await expect(nomeColaborador).toBeVisible(); // por exemplo, verificar se está visível
  await page.waitForLoadState('networkidle')

  await page.getByText('ROBERTA').click({force:true});

  await page.waitForLoadState('networkidle');

  await page.locator('#link-config-dropdown').click();

  const darkModeCheckbox = page.locator('#checkDarkMode');

  await expect(darkModeCheckbox).toBeVisible();
  await expect(darkModeCheckbox).toBeEnabled();


  const isChecked = await darkModeCheckbox.isChecked();

  if (isChecked) {
  await darkModeCheckbox.uncheck();
  await page.waitForLoadState('networkidle');
  } else {
  await darkModeCheckbox.check();
  await page.waitForLoadState('networkidle');
  }

  await page.getByRole('button', { name: 'Salvar' }).click({ force: true });

  await page.waitForLoadState('networkidle');

  if (isChecked) {
  // Se antes estava ativado e agora foi desativado, espera logo claro
  const lightLogo = page.locator('img[src="/static/img/logo/unifip_logo.svg"]');
  await expect(lightLogo).toBeVisible();
  } else {
  // Se antes estava desativado e agora foi ativado, espera logo escuro
  const darkLogo = page.locator('img[src="/static/img/logo/unifip_logo_dark.svg"]');
  await expect(darkLogo).toBeVisible();
  }
});