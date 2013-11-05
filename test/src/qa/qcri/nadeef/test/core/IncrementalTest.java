/*
 * QCRI, NADEEF LICENSE
 * NADEEF is an extensible, generalized and easy-to-deploy data cleaning platform built at QCRI.
 * NADEEF means "Clean" in Arabic
 *
 * Copyright (c) 2011-2013, Qatar Foundation for Education, Science and Community Development (on
 * behalf of Qatar Computing Research Institute) having its principle place of business in Doha,
 * Qatar with the registered address P.O box 5825 Doha, Qatar (hereinafter referred to as "QCRI")
 *
 * NADEEF has patent pending nevertheless the following is granted.
 * NADEEF is released under the terms of the MIT License, (http://opensource.org/licenses/MIT).
 */

package qa.qcri.nadeef.test.core;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import qa.qcri.nadeef.core.datamodel.CleanPlan;
import qa.qcri.nadeef.core.datamodel.NadeefConfiguration;
import qa.qcri.nadeef.core.datamodel.Rule;
import qa.qcri.nadeef.core.pipeline.CleanExecutor;
import qa.qcri.nadeef.core.util.Bootstrap;
import qa.qcri.nadeef.core.util.CSVTools;
import qa.qcri.nadeef.core.util.sql.DBInstaller;
import qa.qcri.nadeef.core.util.sql.SQLDialectBase;
import qa.qcri.nadeef.core.util.sql.SQLDialectFactory;
import qa.qcri.nadeef.test.NadeefTestBase;
import qa.qcri.nadeef.test.TestDataRepository;
import qa.qcri.nadeef.tools.DBConfig;
import qa.qcri.nadeef.tools.Tracer;

import java.io.File;
import java.util.HashSet;

/**
 * Test for incremental detection.
 */
@RunWith(Parameterized.class)
public class IncrementalTest extends NadeefTestBase {
    public IncrementalTest(String testConfig_) {
        super(testConfig_);
    }

    @Before
    public void setup() {
        try {
            Bootstrap.start(testConfig);
            Tracer.setVerbose(true);
            NadeefConfiguration.setMaxIterationNumber(1);
            NadeefConfiguration.setAlwaysOverride(true);
            DBInstaller.uninstall(NadeefConfiguration.getDbConfig());
        } catch (Exception ex) {
            ex.printStackTrace();
            Assert.fail(ex.getMessage());
        }
    }

    @After
    public void shutdown() {
        Bootstrap.shutdown();
    }

    @Test
    public void testIncPair1() {
        CleanExecutor executor = null;
        try {
            CleanPlan cleanPlan = TestDataRepository.getIncCleanPlan1();
            executor = new CleanExecutor(cleanPlan);
            executor.detect();
            int count = executor.getDetectViolationCount();
            Assert.assertEquals(27, count);

            DBConfig dbConfig = cleanPlan.getSourceDBConfig();
            Rule rule = cleanPlan.getRule();
            String tableName = (String)rule.getTableNames().get(0);
            SQLDialectBase dialectManager =
                SQLDialectFactory.getDialectManagerInstance(dbConfig.getDialect());
            File incFile = new File("test/src/qa/qcri/nadeef/test/input/dumptest_inc1.csv");
            HashSet<Integer> newTuples =
                CSVTools.append(dbConfig, dialectManager, tableName, incFile);
            executor.incrementalAppend(tableName, newTuples);
            executor.detect();

            count = executor.getDetectViolationCount();
            Assert.assertEquals(12, count);

            incFile = new File("test/src/qa/qcri/nadeef/test/input/dumptest_inc2.csv");
            newTuples =
                CSVTools.append(dbConfig, dialectManager, tableName, incFile);
            executor.incrementalAppend(tableName, newTuples);
            executor.detect();

            count = executor.getDetectViolationCount();
            Assert.assertEquals(14, count);

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (executor != null) {
                executor.shutdown();
            }
        }
    }
}
