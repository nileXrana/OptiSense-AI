"use client"
import React from 'react'
import { useUser } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';

const Profile = ({ openDialog }: any) => {
    const { user, isLoaded } = useUser();
    return (
        <Dialog open={openDialog}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex flex-col items-center space-y-3">
                                <div className='flex gap-4 items-center'>
                                    {user && user.imageUrl && (
                                        <Image
                                            src={user.imageUrl}
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                            className="rounded-full border-2 border-gray-200"
                                        />
                                    )}
                                    <div className="text-left">
                                        <p className="font-semibold text-lg">{user?.fullName || 'User'}</p>
                                        <p className="text-gray-600 text-sm">{user?.primaryEmailAddress?.emailAddress || 'No email'}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Profile
