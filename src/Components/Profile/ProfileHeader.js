const ProfileHeader = ({user}) => {
    return (
        <>
            <h1>Hello {user.username}</h1>
            <p> Career {user.careerTitle}</p>
            <p> </p>
        </>
    )
}

export default ProfileHeader;