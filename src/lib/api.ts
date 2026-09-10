export type Graduate = {
  name: string;
  slug: string;
};

type GraduateApiResponse = {
  data: Graduate[];
};

export async function getGraduates(): Promise<Graduate[]> {
  const response = await fetch("/api/graduates");

  if (!response.ok) {
    throw new Error(`Failed to fetch graduates: ${response.status}`);
  }

  const result: GraduateApiResponse = await response.json();

 return result.data;
}

type PostMessageData = {
  graduate: string;
  message: string;
  sender_name: string;
  is_anonymous: boolean;
};

export async function postGraduates({payLoad,}:{
  payLoad: PostMessageData;
}){
  const response = await fetch("/api/messages",{
    method: "POST",
    headers:{"Content-type": "application/json", },
    body: JSON.stringify(payLoad),
});

  if (!response.ok){
    throw new Error(`Failed to post message: ${response.status}`);
  }
  return response.json();

}
 