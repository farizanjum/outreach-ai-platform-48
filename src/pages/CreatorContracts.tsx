
import React, { useState } from 'react';
import { CreatorSidebar } from '@/components/CreatorSidebar';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, PenTool } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contract {
  id: string;
  campaign: string;
  brand: string;
  status: 'drafted' | 'sent' | 'signed';
  createdAt: string;
  amount: string;
  pdfUrl: string;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    campaign: 'Summer Fashion Collection 2024',
    brand: 'StyleCo',
    status: 'sent',
    createdAt: '2024-01-15',
    amount: '$2,500',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: '2',
    campaign: 'Tech Product Launch',
    brand: 'TechCorp',
    status: 'signed',
    createdAt: '2024-01-10',
    amount: '$5,000',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: '3',
    campaign: 'Fitness App Promotion',
    brand: 'FitLife',
    status: 'drafted',
    createdAt: '2024-01-08',
    amount: '$1,800',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

const CreatorContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const { toast } = useToast();

  const getStatusBadge = (status: Contract['status']) => {
    const statusConfig = {
      drafted: { variant: 'outline' as const, label: 'Drafted' },
      sent: { variant: 'secondary' as const, label: 'Sent' },
      signed: { variant: 'default' as const, label: 'Signed' }
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
      title: "Contract Signed! ✅",
      description: `Contract for "${selectedContract.campaign}" has been successfully signed.`,
    });

    setIsSignModalOpen(false);
    setSignatureName('');
    setSelectedContract(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <CreatorSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              My Contracts
            </h1>
            <p className="text-gray-300">
              Review, sign, and manage your collaboration contracts
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
                    <TableHead className="text-gray-300 font-medium">Campaign</TableHead>
                    <TableHead className="text-gray-300 font-medium">Brand</TableHead>
                    <TableHead className="text-gray-300 font-medium">Amount</TableHead>
                    <TableHead className="text-gray-300 font-medium">Status</TableHead>
                    <TableHead className="text-gray-300 font-medium">Created</TableHead>
                    <TableHead className="text-gray-300 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white font-medium">
                        {contract.campaign}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {contract.brand}
                      </TableCell>
                      <TableCell className="text-green-400 font-semibold">
                        {contract.amount}
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
                                View
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

                          {/* Sign Button */}
                          {contract.status !== 'signed' && (
                            <Button
                              onClick={() => {
                                setSelectedContract(contract);
                                setIsSignModalOpen(true);
                              }}
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              size="sm"
                            >
                              <PenTool className="w-4 h-4 mr-1" />
                              Sign
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
                    Type Your Full Legal Name
                  </Label>
                  <Input
                    id="signatureName"
                    placeholder="Enter your full legal name"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                  />
                  <p className="text-xs text-gray-400">
                    This will serve as your digital signature with today's date
                  </p>
                </div>

                <div className="text-xs text-gray-400 bg-gray-800/20 p-3 rounded-lg">
                  <strong>Legal Disclaimer:</strong> By typing your name above and clicking "Sign Contract", you acknowledge that this constitutes a legally binding electronic signature equivalent to a handwritten signature.
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
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    disabled={!signatureName.trim()}
                  >
                    <PenTool className="w-4 h-4 mr-2" />
                    Sign Contract
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default CreatorContracts;
