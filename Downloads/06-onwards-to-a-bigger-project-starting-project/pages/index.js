import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
{    id:'m1',
    title:'a first meetup',
    image: 'https://irs1.4sqi.net/img/general/width960/121013064_15Iw0b1iRuFdV382LThLpZ22nK-KO2pU4IsKPGzUD2E.jpg',
    address:'Some Address 5, 123 Miami',
    description: ' this is space'
},
{    id:'m2',
    title:'a second meetup',
    image: 'https://irs1.4sqi.net/img/general/width960/121013064_15Iw0b1iRuFdV382LThLpZ22nK-KO2pU4IsKPGzUD2E.jpg',
    address:'Some Address 12, 123 Miami',
    description: ' this is space'
}
]

function HomePage(props) {
    return <MeetupList meetups={props.meetups} /> 
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     //fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export async function getStaticProps() {
    //fetch data from an api
    const client = await MongoClient.connect("mongodb+srv://cluster0.ocrtx4t.mongodb.net/")
    const db = client.db()

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate:1
    };
}

export default HomePage;