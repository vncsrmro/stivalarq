const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm md:text-base">
          Desenvolvido por{" "}
          <a 
            href="https://inovasys.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold hover:underline transition-all"
          >
            INOVASYS
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
