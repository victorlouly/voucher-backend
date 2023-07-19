const mailer = require("nodemailer");

module.exports = (email, nome, whatsapp, matricula, turma, consultor, nomeindicado, previsao, anexo) => {
  const smtpTransport = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, //SSL/TLS
    auth: {
      user: "voucher@facinpro.edu.br",
      pass: "facinpro2023",
    },
  });

  const mail = {
    from: "Voucher FacInPro <sistema@facinpro.edu.br>",
    to: [email, 'comercial@facinpro.edu.br', 'contato@facinpro.edu.br'],
    subject: `${nome} Seu Voucher está pronto `,
    html: ` <style>
    hr {
	border: 0;
	border-top: 1px solid #141414;
}

</style>


<img src="https://i.ibb.co/c3r09qM/Whats-App-Image-2023-07-18-at-09-19-44.jpg" alt="">

<hr>

<h2>Beneficiário do Voucher de desconto</h2>
<p style="font-weight: bold;">Nome Completo: ${nome}</p>
<p style="font-weight: bold;">Email: ${email}</p>
<p style="font-weight: bold;">Telefone: ${whatsapp}</p>
<p style="font-weight: bold;">Turma curos FacInPro: ${turma}</p>

<h2>Indicação</h2>
<p style="font-weight: bold;">Nome indicado: ${nomeindicado}</p>
<p style="font-weight: bold;">Número de Matrícula Pós- Graduação FacINPRO: ${matricula}</p>
<p style="font-weight: bold;">Previsão de disponibilidade de desconto do voucher junto ao financeiro: ${previsao}</p>
<p style="font-weight: bold;">Consultor Comercial Responsável pela atendimento: ${consultor}</p>

<hr>

<h1>⚠️INFORMAÇÕES IMPORTANTES PARA USO DO BENEFÍCIO⚠️</h1>
<p> - Valor de desconto válido para planos de parcelamento acima de 18 parcelas.</p>
<p> - Esse voucher só poderá ser utilizado caso o indicado pague a primeira parcela do seu plano financeiro. Esta primeira, não se refere à taxa de matrícula. </p>
<p> - Após a data de previsão de desconto, é obrigatório encaminhar este voucher para o email financeiro@facinpro.edu.br para obter o desconto no seu plano financeiro. Não é automático! </p>
<p> - Não é possível conceder o desconto para o mesmo aluno por mais de uma pessoa.
</p>

<h1>PERGUNTAS FREQUENTES?!</h1>
<h4>Quando posso usufruir do desconto?</h4>
<p>Assim que o indicado pagar a primeira parcela do seu plano financeiro, você poderá encaminhar para o setor financeiro para solicitar o desconto em suas parcelas. Consulte a data prevista para aplicar o desconto do voucher junto ao departamento financeiro. </p>
<h4>Até quando posso usar o voucher? Tem validade?</h4>
<p>Sim, seu voucher tem validade! O benefício pode ser utilizado até a data da última parcela do seu plano financeiro junto à FacInPro.</p>
<h4>Se estiver com todas as parcelas do plano financeiro quitadas?</h4>
<p> Se você já tiver quitado todas as parcelas junto à FacINPRO, o saldo de desconto ficará disponível para outro curso da Faculdade INPRO.</p>
<h4>Tenho um plano de parcelas com menos de 18 parcelas, posso usar o voucher para obter desconto? </h4>
<p>Sim! Porém, você não poderá ser totalmente isento da última parcela em aberto do seu plano financeiro. O setor financeiro calculará o valor do seu contrato em 18 parcelas e concederá o desconto correspondente ao valor total da sua última parcela em aberto.</p>
<h4>Esse desconto vale para outros cursos, como Graduação, Técnico ou Curta Duração?</h4>
<p>Não! O desconto só é válido para os planos financeiros dos cursos de pós-graduação e MBA's.</p>
<h4>Posso perder este benefício?</h4>
<p>Sim! Caso o aluno indicado desista do curso antes de pagar a primeira parcela ou o curso que ele escolheu não seja inaugurado ou seja cancelado antes da abertura da turma, o benefício não terá validade para desconto junto ao departamento financeiro. Se alguma dessas situações ocorrer, o departamento financeiro o comunicará no momento em que for solicitada aplicação do desconto deste voucher. Outra situação é a identificação do desconto do voucher por outra pessoa que alegou e confirmou ter indicado o aluno antes de você.</p>

<p style="font-weight: bold; font-size:15px">Agradecemos a parceria!</p>
<p style="font-weight: bold; font-size:15px">Continue indicando colegas, familiares e pessoas com perfil de fazer um pós-graduação na FacInPro e receba mais voucher de Desconto!</p>
<p style="font-weight: bold; font-size:15px">Vamos Conquistar Juntos!</p>
<p style="font-weight: bold; font-size:15px">Atenciosamente</p>
<p style="font-weight: bold; font-size:15px">Equipe FacInPro.</p>
<br>`
  };

  if (anexo) {
    console.log(anexo);
    mail.attachments = [];
    mail.attachments.push({
      filename: anexo.originalname,
      content: anexo.buffer,
    });
  }

  return new Promise((resolve, reject) => {
    smtpTransport
      .sendMail(mail)
      .then((response) => {
        smtpTransport.close();
        return resolve(response);
      })
      .catch((error) => {
        smtpTransport.close();
        return reject(error);
      });
  });
};
