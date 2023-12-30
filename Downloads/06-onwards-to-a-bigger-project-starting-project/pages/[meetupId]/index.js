import { Fragment, Head } from "react";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails (props) {
 return (
<Fragment>
   <Head>

   </Head>
</Fragment>
   
    <MeetupDetail 
    image= {props.meetupData.image} 
    title= {props.meetupData.title}
    address= {props.meetupData.address}
    description= {props.meetupData.description} />
 );
}

export async function getStaticPaths() {
   const client = await MongoClient.connect("mongodb+srv://cluster0.ocrtx4t.mongodb.net/")
   const db = client.db()

   const meetupsCollection = db.collection('meetups');

   const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

   const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})

   client.close();

   return{
      fallback: false,
      paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
   }
}

export async function getStaticProps(context) {
//fetch data for a single meetup

const meetupId = context.params.meetupId;

console.log(meetupId);
return {
   props:{
      meetupData: {
         id: selectedMeetup._id.toString(),
         title: selectedMeetup.title,
         address: selectedMeetup.address,
         image: selectedMeetup.image,
         description: selectedMeetup.description,
      },
   },
};
}

export default MeetupDetails;