"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Donation() {
  const donations = useQuery(api.donations.listForStreamer);
  const { signOut } = useAuthActions();
  if (!donations) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex gap-6 p-6">
      <Button onClick={signOut}>Выйти</Button>
      <Card>
        <CardHeader>
          <CardTitle>Донаты</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation._id}>
                  <TableCell>{donation.name}</TableCell>
                  <TableCell>${donation.amount.toFixed(2)}</TableCell>
                  <TableCell>{donation.message}</TableCell>
                  <TableCell>
                    {new Date(donation.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
