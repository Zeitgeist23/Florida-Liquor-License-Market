import { PDFDocument, PDFName, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { getAbtForm } from "@/data/abt-forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const W=612,H=792,B=rgb(0,0,0),WHITE=rgb(1,1,1),GRAY=rgb(.82,.82,.82),FB=rgb(.47,.47,.47);
const center=(p:PDFPage,t:string,y:number,s:number,f:PDFFont)=>p.drawText(t,{x:(W-f.widthOfTextAtSize(t,s))/2,y,size:s,font:f,color:B});
const row=(p:PDFPage,x:number,y:number,w:number,h=25)=>p.drawRectangle({x,y:y-h,width:w,height:h,borderColor:B,borderWidth:1});
const section=(p:PDFPage,x:number,y:number,w:number,t:string,f:PDFFont)=>{p.drawRectangle({x,y:y-20,width:w,height:20,color:GRAY,borderColor:B,borderWidth:1});const s=10;p.drawText(t,{x:x+(w-f.widthOfTextAtSize(t,s))/2,y:y-14,size:s,font:f,color:B});};

async function build(){
  const d=await PDFDocument.create(),regular=await d.embedFont(StandardFonts.Helvetica),bold=await d.embedFont(StandardFonts.HelveticaBold),italic=await d.embedFont(StandardFonts.HelveticaOblique),form=d.getForm();
  const text=(p:PDFPage,n:string,x:number,y:number,w:number,h=15)=>{const f=form.createTextField(n);f.setFontSize(9);f.addToPage(p,{x,y,width:w,height:h,borderWidth:.7,borderColor:FB,backgroundColor:WHITE,textColor:B});};
  const box=(p:PDFPage,n:string,x:number,y:number)=>form.createCheckBox(n).addToPage(p,{x,y,width:10,height:10,borderWidth:1,borderColor:B,backgroundColor:WHITE});

  const p1=d.addPage([W,H]);p1.node.set(PDFName.of("Tabs"),PDFName.of("R"));
  [["INSTRUCTIONS FOR COMPLETING",752],["DBPR ABT - 6023",737],["DIVISION OF ALCOHOLIC BEVERAGES AND TOBACCO",722],["REQUEST FOR ALCOHOLIC BEVERAGE LICENSE LIEN SEARCH",707]].forEach(([t,y])=>center(p1,t as string,y as number,12,bold));
  p1.drawText("If you have any questions or need assistance in completing this request, please contact the Division of",{x:72,y:680,size:10,font:italic,color:B});
  p1.drawText("Alcoholic Beverages & Tobacco (AB&T) at (850) 488-8284. Please send your completed request by mail",{x:72,y:667,size:10,font:italic,color:B});p1.drawText("to:",{x:72,y:654,size:10,font:italic,color:B});
  center(p1,"Department of Business and Professional Regulation",629,10,bold);center(p1,"2601 Blair Stone Road",614,10,bold);center(p1,"Tallahassee, FL 32399-1021",599,10,bold);
  p1.drawText("GENERAL INSTRUCTIONS",{x:72,y:560,size:10,font:bold,color:B});p1.drawText("Please complete all information. All questions are applicable.",{x:72,y:536,size:10,font:regular,color:B});
  p1.drawText("REQUEST REQUIREMENTS",{x:72,y:505,size:10,font:bold,color:B});p1.drawText("The request must be accompanied by a check in the amount of $20.00. Make checks payable to the",{x:72,y:480,size:10,font:regular,color:B});p1.drawText("Division of Alcoholic Beverages & Tobacco.",{x:72,y:467,size:10,font:regular,color:B});
  p1.drawText("REQUEST CHECKLIST",{x:72,y:435,size:10,font:bold,color:B});
  const x=72,top=420,w=468,l=142;p1.drawRectangle({x,y:320,width:w,height:100,borderColor:B,borderWidth:1});p1.drawRectangle({x,y:396,width:w,height:24,color:GRAY,borderColor:B,borderWidth:1});p1.drawLine({start:{x:x+l,y:420},end:{x:x+l,y:320},thickness:1,color:B});
  p1.drawText("TRANSACTION",{x:x+6,y:404,size:9,font:bold,color:B});p1.drawText("REQUEST REQUIREMENTS",{x:x+l+6,y:404,size:9,font:bold,color:B});
  ["APPLICATION FOR","ALCOHOLIC BEVERAGE","LICENSE LIEN SEARCH"].forEach((t,i)=>p1.drawText(t,{x:x+6,y:373-i*14,size:9,font:bold,color:B}));
  box(p1,"Checklist_Complete_Application",x+l+12,373);p1.drawText("Complete DBPR ABT-6023 Application for Alcoholic Beverage",{x:x+l+30,y:380,size:9,font:regular,color:B});p1.drawText("License Lien Search",{x:x+l+30,y:367,size:9,font:regular,color:B});
  box(p1,"Checklist_Pay_20_Fee",x+l+12,341);p1.drawText("Pay $20.00 fee (make check payable to the Division of Alcoholic",{x:x+l+30,y:348,size:9,font:regular,color:B});p1.drawText("Beverages & Tobacco)",{x:x+l+30,y:335,size:9,font:regular,color:B});
  p1.drawText("Auth. 61A-5.0012, FAC",{x:72,y:26,size:8,font:bold,color:B});center(p1,"1",26,8,regular);

  const p=d.addPage([W,H]);p.node.set(PDFName.of("Tabs"),PDFName.of("R"));
  center(p,"DBPR ABT-6023 - Division of Alcoholic Beverages and Tobacco",760,10,bold);center(p,"Request for Alcoholic Beverage License Lien Search",746,10,bold);center(p,"STATE OF FLORIDA",716,12,bold);center(p,"DEPARTMENT OF BUSINESS AND PROFESSIONAL REGULATION",700,11,bold);
  p.drawText("DBPR Form",{x:486,y:716,size:9,font:bold,color:B});p.drawText("ABT-6023",{x:492,y:703,size:9,font:bold,color:B});p.drawText("02/2013",{x:500,y:690,size:9,font:bold,color:B});
  p.drawText("If you have any questions or need assistance in completing this request, please contact the Division of",{x:88,y:670,size:9,font:italic,color:B});p.drawText("Alcoholic Beverages & Tobacco (AB&T) at (850) 488-8284. Please send your completed request by mail to:",{x:88,y:658,size:9,font:italic,color:B});
  center(p,"Department of Business and Professional Regulation",630,9,bold);center(p,"2601 Blair Stone Road",617,9,bold);center(p,"Tallahassee, FL 32399-1021",604,9,bold);
  const sx=82,sw=448,t=548;section(p,sx,t,sw,"SECTION 1 - REQUESTOR INFORMATION",bold);let ry=t-20;for(let i=0;i<6;i++){row(p,sx,ry,sw);ry-=25;}
  const label=(s:string,x:number,y:number,f=regular)=>p.drawText(s,{x,y,size:9,font:f,color:B});
  label("Name of Requestor:",88,t-39);text(p,"Requestor_Name",190,t-45,330);
  label("Mailing Address:",88,t-64);text(p,"Requestor_Mailing_Address",190,t-70,330);
  label("City:",88,t-89);text(p,"Requestor_City",115,t-95,210);label("State:",333,t-89);text(p,"Requestor_State",365,t-95,42);label("ZIP:",414,t-89);text(p,"Requestor_Zip",438,t-95,82);
  label("E-mail Address:",88,t-114);text(p,"Requestor_Email",155,t-120,175);label("Telephone:",338,t-114);text(p,"Requestor_Telephone",392,t-120,76);label("Ext:",474,t-114);text(p,"Requestor_Telephone_Ext",497,t-120,23);
  label("Contact Person (if applicable):",88,t-139);text(p,"Contact_Person",220,t-145,300);
  label("Telephone Number:",88,t-164);text(p,"Contact_Telephone",180,t-170,105);label("Ext:",290,t-164);text(p,"Contact_Telephone_Ext",314,t-170,34);label("E-mail:",356,t-164);text(p,"Contact_Email",390,t-170,130);
  const s2=360;section(p,sx,s2,sw,"SECTION 2 - LICENSE INFORMATION",bold);ry=s2-20;for(let i=0;i<3;i++){row(p,sx,ry,sw);ry-=25;}
  label("License number to be researched:",88,s2-39);text(p,"License_Number",230,s2-45,290);label("Owner Name:",88,s2-64);text(p,"Owner_Name",150,s2-70,370);label("Business Name (DBA):",88,s2-89);text(p,"Business_Name_DBA",185,s2-95,335);
  const s3=252;section(p,sx,s3,sw,"SECTION 3 - PAYMENT INFORMATION",bold);ry=s3-20;for(let i=0;i<2;i++){row(p,sx,ry,sw);ry-=25;}
  label("Check/Money Order Number:",88,s3-39,bold);text(p,"Check_Money_Order_Number",230,s3-45,290);label("Lien Account Number (if Applicable):",88,s3-64,bold);text(p,"Lien_Account_Number",260,s3-70,260);
  p.drawRectangle({x:322,y:72,width:208,height:64,borderColor:B,borderWidth:1});p.drawText("DABT Received / Date Stamp",{x:330,y:122,size:9,font:bold,color:B});p.drawText("Auth. 61A-5.0012, FAC",{x:72,y:26,size:8,font:bold,color:B});center(p,"2",26,8,regular);
  form.updateFieldAppearances(regular);return d.save({useObjectStreams:false});
}

function headers(cfg:ReturnType<typeof getAbtForm>,download:boolean,total:number){return {"Content-Type":"application/pdf","Content-Disposition":`${download?"attachment":"inline"}; filename="ABT-6023-fillable.pdf"`,"Cache-Control":"no-store, no-cache, must-revalidate, max-age=0","Pragma":"no-cache","Expires":"0","Accept-Ranges":"bytes","X-Content-Type-Options":"nosniff","X-FLLM-Official-Source":cfg?.officialPdfUrl||"","X-FLLM-Last-Verified":cfg?.lastVerified||"","X-FLLM-PDF-Revision":"20260821-6","Content-Length":String(total)};}

export async function GET(request:Request){
  const cfg=getAbtForm("abt-6023");if(!cfg)return Response.json({error:"ABT-6023 is not configured."},{status:404});
  const u=new URL(request.url),download=u.searchParams.get("download")==="1",bytes=await build(),total=bytes.byteLength,range=request.headers.get("range");
  if(range){const m=/bytes=(\d*)-(\d*)/.exec(range);if(m){let start=m[1]?Number(m[1]):0,end=m[2]?Number(m[2]):total-1;if(!m[1]&&m[2]){const suffix=Number(m[2]);start=Math.max(total-suffix,0);end=total-1;}start=Math.max(0,start);end=Math.min(total-1,end);if(start<=end){const chunk=bytes.slice(start,end+1);return new Response(chunk,{status:206,headers:{...headers(cfg,download,chunk.byteLength),"Content-Range":`bytes ${start}-${end}/${total}`}});}}return new Response(null,{status:416,headers:{...headers(cfg,download,0),"Content-Range":`bytes */${total}`}});}
  return new Response(bytes,{status:200,headers:headers(cfg,download,total)});
}

export async function HEAD(request:Request){const cfg=getAbtForm("abt-6023");if(!cfg)return new Response(null,{status:404});const u=new URL(request.url),download=u.searchParams.get("download")==="1",bytes=await build();return new Response(null,{status:200,headers:headers(cfg,download,bytes.byteLength)});}
