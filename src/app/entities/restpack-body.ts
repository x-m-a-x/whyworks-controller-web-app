
export class RestpackBody {
    public html: string;
    public json: string = 'true';
    public pdf_margins: string = "40px 40px";
    public filename: string;
    public pdf_header: string; //  like <span class="pageNumber"></span> of <span class="totalPages"></span>
    public pdf_footer: string;
    public pdf_author: string = "WhyWorks";
    public headers: string; // like X-Test: header\nAccept-Type: html
    public css: string;
    public user_password: string;
    public js: string;
    public grayscale: string = 'false';
}