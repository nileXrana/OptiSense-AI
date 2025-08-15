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
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button';

const Profile = ({ openDialog, USER }: any) => {
    const { user, isLoaded } = useUser();
    return (
        <Dialog open={openDialog}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogDescription>
                        View your profile information and token usage
                    </DialogDescription>
                </DialogHeader>
                {/* <div className="flex flex-col"> */}
                    <div className="flex flex-col">
                        <div className='flex gap-4 my-2 items-center'>
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
                                <h2 className="font-semibold text-lg">{user?.fullName || 'User'}</h2>
                                <p className="text-gray-600 text-sm">{user?.primaryEmailAddress?.emailAddress || 'No email'}</p>
                            </div>
                        </div>
                        <hr className='my-3'></hr>
                        <div className='p-2 flex flex-col gap-2'>
                            <h3 className='font-bold'>Token Usage</h3>
                            <p>0/0</p>
                            <Progress value={33} />
                            <p className='flex p-1 items-center justify-between font-bold'>Current Plan <span className='bg-gray-200 p-2 text-sm rounded-md'>{USER?.orderId ? "Pro Plan" : "Free Plan"}</span></p>
                        </div>
                        <div className='p-4 border rounded-xl'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='font-bold text-lg'>Pro Plan</h2>
                                    <h2>500,000 Tokens</h2>
                                </div>
                                <h2 className='font-bold text-lg'>$10 / Month</h2>
                            </div>
                            <hr className='my-3'/>
                            <Button>Upgrade</Button>
                        </div>
                    </div>
                {/* </div> */}
            </DialogContent>
        </Dialog>
    )
}

export default Profile
