
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contract {
  id: string;
  creator: string;
  campaign: string;
  status: 'pending' | 'signed' | 'rejected' | 'expired';
  createdAt: string;
  pdfUrl: string;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    creator: 'Sarah Johnson',
    campaign: 'Summer Fashion Collection 2024',
    status: 'pending',
    createdAt: '2024-01-15',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: '2',
    creator: 'Mike Chen',
    campaign: 'Tech Product Launch',
    status: 'signed',
    createdAt: '2024-01-10',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: '3',
    creator: 'Emma Rodriguez',
    campaign: 'Fitness App Promotion',
    status: 'pending',
    createdAt: '2024-01-08',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: '4',
    creator: 'Alex Thompson',
    campaign: 'Travel Gear Campaign',
    status: 'rejected',
    createdAt: '2024-01-05',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

const Contracts = () => {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const { toast } = useToast();

  const getStatusBadge = (status: Contract['status']) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Pending' },
      signed: { variant: 'default' as const, label: 'Signed' },
      rejected: { variant: 'destructive' as const, label: 'Rejected' },
      expired: { variant: 'outline' as const, label: 'Expired' }
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleSignContract = () => {
    if (!selectedContract || !signatureName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name to sign the contract.",
        variant: "destructive"
      });
      return;
    }

    setContracts(prev => 
      prev.map(contract => 
        contract.id === selectedContract.id 
          ? { ...contract, status: 'signed' as const }
          : contract
      )
    );

    toast({
      title: "Contract Signed",
      description: `Contract for "${selectedContract.campaign}" has been successfully signed.`,
    });

    setIsSignModalOpen(false);
    setSignatureName('');
    setSelectedContract(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Contract Management
          </h1>
          <p className="text-gray-300">
            Review, sign, and manage your creator contracts
          </p>
        </div>

        {/* Contracts Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_64px_0_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Active Contracts</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <FileText className="w-4 h-4" />
              <span>{contracts.length} total contracts</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-gray-300 font-medium">Creator</TableHead>
                  <TableHead className="text-gray-300 font-medium">Campaign</TableHead>
                  <TableHead className="text-gray-300 font-medium">Status</TableHead>
                  <TableHead className="text-gray-300 font-medium">Created At</TableHead>
                  <TableHead className="text-gray-300 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium">
                      {contract.creator}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {contract.campaign}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(contract.status)}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(contract.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {/* PDF Preview Button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl h-[80vh] bg-white/10 backdrop-blur-xl border-white/20">
                            <DialogHeader>
                              <DialogTitle className="text-white">
                                Contract Preview - {contract.campaign}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 rounded-lg overflow-hidden">
                              <iframe
                                src={contract.pdfUrl}
                                className="w-full h-full bg-white rounded-lg"
                                title={`Contract for ${contract.campaign}`}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Sign Button (only for pending contracts) */}
                        {contract.status === 'pending' && (
                          <Button
                            onClick={() => {
                              setSelectedContract(contract);
                              setIsSignModalOpen(true);
                            }}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                            size="sm"
                          >
                            Agree & Sign
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Digital Signature Modal */}
        <Dialog open={isSignModalOpen} onOpenChange={setIsSignModalOpen}>
          <DialogContent className="bg-white/10 backdrop-blur-xl border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">
                Digital Signature Required
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                <p className="text-blue-100 text-sm">
                  By signing this contract, you agree to the terms and conditions outlined in the document for "{selectedContract?.campaign}".
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signatureName" className="text-white font-medium">
                  Full Legal Name
                </Label>
                <Input
                  id="signatureName"
                  placeholder="Enter your full legal name"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                />
                <p className="text-xs text-gray-400">
                  This will serve as your digital signature
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSignModalOpen(false);
                    setSignatureName('');
                    setSelectedContract(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSignContract}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  disabled={!signatureName.trim()}
                >
                  Sign Contract
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Contracts;
